import asyncio
import csv
import io
from fastapi import FastAPI, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os

from agents.security import run_security_scan
from agents.devops import run_devops_scan
from database import engine, Base, SessionLocal, AuditRecord
from utils.github import parse_github_url, get_target_files

os.makedirs("./data", exist_ok=True)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Autonomous Auditor Brain")

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@app.get("/api/status")
def get_agent_status():
    return {"security_agent": "online", "devops_agent": "online", "scans_completed": 0}

@app.post("/api/scan")
async def start_audit_scan(repo_url: str, db: Session = Depends(get_db)):
    owner, repo = parse_github_url(repo_url)
    if owner and repo:
        try:
            file_urls = get_target_files(owner, repo)
            file_urls = file_urls[:4] 
        except Exception as e:
            return {"message": "Failed", "results": [{"agent": "System", "target": repo_url, "vulnerabilities": 1, "report": str(e)}]}
    else:
        file_urls = [repo_url]

    all_results = []
    
    for url in file_urls:
        tasks = []
        if url.endswith('.py') or url.endswith('.js') or url.endswith('.ts'):
            tasks.append(run_security_scan(url))
        elif 'Dockerfile' in url or url.endswith('.yml') or url.endswith('.yaml'):
            tasks.append(run_devops_scan(url))
        else:
            tasks.append(run_security_scan(url))
            tasks.append(run_devops_scan(url))

        if tasks:
            file_results = await asyncio.gather(*tasks)
            all_results.extend(file_results)
    
    for res in all_results:
        db_record = AuditRecord(target=res["target"], agent=res["agent"], issues_found=res["vulnerabilities"], report=res["report"])
        db.add(db_record)
    
    db.commit()
    return {"message": "Multi-Agent Audit completed.", "results": all_results}

@app.get("/api/history")
def get_audit_history(db: Session = Depends(get_db)):
    records = db.query(AuditRecord).order_by(AuditRecord.timestamp.desc()).limit(15).all()
    return {"history": records}

# 📊 THE NEW UPGRADE: The CSV Export Endpoint!
@app.get("/api/export")
def export_history_csv(db: Session = Depends(get_db)):
    records = db.query(AuditRecord).order_by(AuditRecord.timestamp.desc()).all()
    
    stream = io.StringIO()
    csv_writer = csv.writer(stream)
    
    # Write the column headers
    csv_writer.writerow(["Timestamp", "Agent", "Target", "Issues Found", "Report Summary"])
    
    # Write the data rows
    for r in records:
        # We clean up the report string slightly so it doesn't break the CSV formatting
        clean_report = r.report.replace('\n', ' ').replace('\r', '')
        csv_writer.writerow([r.timestamp.strftime("%Y-%m-%d %H:%M:%S"), r.agent, r.target, r.issues_found, clean_report])
    
    return Response(
        content=stream.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=Auditor_Mission_Report.csv"}
    )
