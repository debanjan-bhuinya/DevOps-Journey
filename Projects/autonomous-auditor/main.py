import asyncio
from fastapi import FastAPI, Depends
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
            file_urls = file_urls[:4] # Grab a few files
        except Exception as e:
            return {"message": "Failed", "results": [{"agent": "System", "target": repo_url, "vulnerabilities": 1, "report": str(e)}]}
    else:
        file_urls = [repo_url]

    all_results = []
    
    # 🚦 THE UPGRADE: SMART ROUTING 🚦
    for url in file_urls:
        tasks = []
        
        # If it's application code, send to Security!
        if url.endswith('.py') or url.endswith('.js') or url.endswith('.ts'):
            tasks.append(run_security_scan(url))
            
        # If it's infrastructure, send to DevOps!
        elif 'Dockerfile' in url or url.endswith('.yml') or url.endswith('.yaml'):
            tasks.append(run_devops_scan(url))
            
        # If we don't know, send to both just in case
        else:
            tasks.append(run_security_scan(url))
            tasks.append(run_devops_scan(url))

        # Wait for whichever tasks were assigned
        if tasks:
            file_results = await asyncio.gather(*tasks)
            all_results.extend(file_results)
    
    for res in all_results:
        db_record = AuditRecord(
            target=res["target"], agent=res["agent"], issues_found=res["vulnerabilities"], report=res["report"]
        )
        db.add(db_record)
    
    db.commit()
    return {"message": "Multi-Agent Audit completed.", "results": all_results}

@app.get("/api/history")
def get_audit_history(db: Session = Depends(get_db)):
    records = db.query(AuditRecord).order_by(AuditRecord.timestamp.desc()).limit(15).all()
    return {"history": records}
