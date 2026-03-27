import asyncio
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os

from agents.security import run_security_scan
from agents.devops import run_devops_scan
from database import engine, Base, SessionLocal, AuditRecord

# 1. Create the 'data' folder and generate the database tables!
os.makedirs("./data", exist_ok=True)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Autonomous Auditor Brain")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/status")
def get_agent_status():
    return {"security_agent": "online", "devops_agent": "online", "scans_completed": 0}

@app.post("/api/scan")
async def start_audit_scan(repo_url: str, db: Session = Depends(get_db)):
    security_task = run_security_scan(repo_url)
    devops_task = run_devops_scan(repo_url)
    
    results = await asyncio.gather(security_task, devops_task)
    
    # 2. SAVE TO MEMORY: Loop through the results and save them to the database
    for res in results:
        db_record = AuditRecord(
            target=res["target"],
            agent=res["agent"],
            issues_found=res["vulnerabilities"],
            report=res["report"]
        )
        db.add(db_record)
    
    db.commit() # Lock it into the vault!
    
    return {"message": "Multi-Agent Audit completed.", "results": results}

# 3. NEW ENDPOINT: Fetch the history!
@app.get("/api/history")
def get_audit_history(db: Session = Depends(get_db)):
    records = db.query(AuditRecord).order_by(AuditRecord.timestamp.desc()).limit(10).all()
    return {"history": records}
