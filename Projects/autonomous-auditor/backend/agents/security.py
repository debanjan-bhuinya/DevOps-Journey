import os
import requests
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def run_security_scan(target_repo: str):
    print(f"\n[🛡️ SECURITY AGENT] Mission target acquired: {target_repo}")
    
    try:
        response = requests.get(target_repo)
        if response.status_code == 200:
            live_code = response.text
        else:
            raise Exception("File not found on GitHub. Check the URL!")
    except Exception as e:
         return {"agent": "Security", "target": target_repo, "vulnerabilities": 0, "report": f"Download failed: {str(e)}"}

    # THE UPGRADE: We now demand the corrected code!
    prompt = f"""
    You are an elite DevOps Security Agent. Analyze this code. 
    If it is completely safe, reply EXACTLY with: "Scan passed perfectly. Code is secure."
    
    If it has vulnerabilities:
    1. Write exactly one short sentence explaining the vulnerability.
    2. Add a new line, and then provide the FULL, corrected, secure version of the code.
    
    Code to analyze:
    {live_code}
    """
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        ai_response = model.generate_content(prompt)
        ai_report = ai_response.text.strip()
        vulns_found = 0 if "secure" in ai_report.lower() else 1
    except Exception as e:
        ai_report = f"AI Comm Link Failed: {str(e)}"
        vulns_found = 0
    
    return {
        "agent": "Security (Powered by Gemini)",
        "target": target_repo,
        "vulnerabilities": vulns_found,
        "report": ai_report
    }
