import asyncio
import random

async def run_security_scan(target_repo: str):
    print(f"\n[🛡️ SECURITY AGENT] Mission received. Scanning repository: {target_repo}...")
    
    # Simulate the time it takes an AI to read the code
    await asyncio.sleep(3) 
    
    # Simulate finding random vulnerabilities for now
    vulnerabilities_found = random.randint(0, 3)
    
    if vulnerabilities_found == 0:
        report = "Scan passed perfectly. Code is secure."
    else:
        report = f"WARNING: Found {vulnerabilities_found} potential security vulnerabilities in dependencies."
        
    print(f"[🛡️ SECURITY AGENT] Mission accomplished. Returning report to Brain.\n")
    
    return {
        "agent": "Security",
        "target": target_repo,
        "vulnerabilities": vulnerabilities_found,
        "report": report
    }
