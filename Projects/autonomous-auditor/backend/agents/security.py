import os
import requests
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def run_security_scan(target_repo: str):
    print(f"\n[🛡️ SECURITY AGENT] Mission target acquired: {target_repo}")
    
    # THE FIX: We now use the exact URL passed from the Dashboard!
    print(f"[🛡️ SECURITY AGENT] Downloading live code from GitHub...")
    
    try:
        response = requests.get(target_repo)
        if response.status_code == 200:
            live_code = response.text
            print("[🛡️ SECURITY AGENT] Code downloaded successfully. Handing to Gemini...")
        else:
            raise Exception("File not found on GitHub. Check the URL!")
            
    except Exception as e:
         return {"agent": "Security", "target": target_repo, "vulnerabilities": 0, "report": f"Download failed: {str(e)}"}

    # We also upgrade the prompt so the AI can give us a "Clean" report
    prompt = f"""
    You are an elite DevOps Security Agent. 
    Analyze this code. Tell me if there are any security vulnerabilities in exactly one short sentence. 
    If it is completely safe, reply EXACTLY with: "Scan passed perfectly. Code is secure."
    Do not use formatting, just plain text.
    Code:
    {live_code}
    """
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        ai_response = model.generate_content(prompt)
        ai_report = ai_response.text.strip()
        
        # Dynamic Counter: If the AI says it's secure, 0 bugs. Otherwise, 1 bug.
        vulns_found = 0 if "secure" in ai_report.lower() else 1
    except Exception as e:
        ai_report = f"AI Comm Link Failed: {str(e)}"
        vulns_found = 0

    print(f"[🛡️ SECURITY AGENT] Analysis complete. Returning report to Dashboard.\n")
    
    return {
        "agent": "Security (Powered by Gemini)",
        "target": target_repo,
        "vulnerabilities": vulns_found,
        "report": ai_report
    }
