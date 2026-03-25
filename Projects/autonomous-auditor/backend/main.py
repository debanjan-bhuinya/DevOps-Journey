from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agents.security import run_security_scan

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

# NEW: The Dispatch Endpoint!
@app.post("/api/scan")
async def start_audit_scan(repo_url: str):
    # The Brain receives the request and dispatches the Security Agent
    security_report = await run_security_scan(repo_url)
    
    return {
        "message": "Audit completed successfully.",
        "results": [security_report]
    }
