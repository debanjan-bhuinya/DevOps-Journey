import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agents.security import run_security_scan
from agents.devops import run_devops_scan

app = FastAPI(title="Autonomous Auditor Brain")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/status")
def get_agent_status():
    return {"security_agent": "online", "devops_agent": "online", "scans_completed": 0}

@app.post("/api/scan")
async def start_audit_scan(repo_url: str):
    # THE MAGIC: Dispatch BOTH agents at the exact same time!
    security_task = run_security_scan(repo_url)
    devops_task = run_devops_scan(repo_url)
    
    # Wait for both workers to finish their jobs
    results = await asyncio.gather(security_task, devops_task)
    
    return {
        "message": "Multi-Agent Audit completed.",
        "results": results  # This now contains TWO reports!
    }
