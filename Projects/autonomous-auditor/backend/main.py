import asyncio
import csv
import io
from fastapi import FastAPI, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
from apscheduler.schedulers.asyncio import AsyncIOScheduler

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

# --- CORE SCANNING ENGINE ---
async def execute_full_scan(repo_url: str, db: Session):
    owner, repo = parse_github_url(repo_url)
    if owner and repo:
        try:
            file_urls = get_target_files(owner, repo)[:4] 
        except Exception as e:
            return [{"agent": "System", "target": repo_url, "vulnerabilities": 1, "report": str(e)}]
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
    return all_results

# --- API ENDPOINTS ---
@app.get("/api/status")
def get_agent_status():
    return {"security_agent": "online", "devops_agent": "online", "scans_completed": 0}

@app.post("/api/scan")
async def start_audit_scan(repo_url: str, db: Session = Depends(get_db)):
    results = await execute_full_scan(repo_url, db)
    return {"message": "Multi-Agent Audit completed.", "results": results}

@app.get("/api/history")
def get_audit_history(db: Session = Depends(get_db)):
    records = db.query(AuditRecord).order_by(AuditRecord.timestamp.desc()).limit(15).all()
    return {"history": records}

@app.get("/api/export")
def export_history_csv(db: Session = Depends(get_db)):
    records = db.query(AuditRecord).order_by(AuditRecord.timestamp.desc()).all()
    stream = io.StringIO()
    csv_writer = csv.writer(stream)
    csv_writer.writerow(["Timestamp", "Agent", "Target", "Issues Found", "Report Summary"])
    for r in records:
        clean_report = r.report.replace('\n', ' ').replace('\r', '')
        csv_writer.writerow([r.timestamp.strftime("%Y-%m-%d %H:%M:%S"), r.agent, r.target, r.issues_found, clean_report])
    return Response(content=stream.getvalue(), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=Auditor_Mission_Report.csv"})

# --- 🤖 THE AUTOPILOT UPGRADE ---
async def automated_nightly_audit():
    print("\n[⏰ AUTOPILOT] Waking up for scheduled automated audit...")
    db = SessionLocal()
    try:
        target = "https://github.com/debanjan-bhuinya/DevOps-Journey"
        await execute_full_scan(target, db)
        print("[⏰ AUTOPILOT] Scheduled audit complete. Reports saved to memory bank.\n")
    finally:
        db.close()

@app.on_event("startup")
async def start_background_scheduler():
    scheduler = AsyncIOScheduler()
    # We set it to run every 12 hours automatically!
    scheduler.add_job(automated_nightly_audit, 'interval', hours=12)
    scheduler.start()
    print("[⚙️ SYSTEM] Background Autopilot Scheduler Started.")
