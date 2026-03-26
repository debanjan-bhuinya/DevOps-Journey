import os
import requests
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def run_security_scan(target_repo: str):
    print(f"\n[🛡️ SECURITY AGENT] Mission target acquired: {target_repo}")
    
    # 1. The URL to the raw text of the file you just pushed!
    raw_github_url = "https://raw.githubusercontent.com/debanjan-bhuinya/DevOps-Journey/main/vulnerable.py"
    
    print(f"[🛡️ SECURITY AGENT] Downloading live code from GitHub...")
    
    try:
        # 2. Download the file
        response = requests.get(raw_github_url)
        if response.status_code == 200:
            live_code = response.text
            print("[🛡️ SECURITY AGENT] Code downloaded successfully. Handing to Gemini...")
        else:
            raise Exception("File not found on GitHub. Did you push it?")
            
    except Exception as e:
         return {"agent": "Security", "target": target_repo, "vulnerabilities": 0, "report": f"Download failed: {str(e)}"}

    # 3. Feed the downloaded code to the AI
    prompt = f"""
    You are an elite DevOps Security Agent. 
    Analyze this Python code. Tell me the security vulnerability in exactly one short sentence. 
    Do not use formatting, just plain text.
    Code:
    {live_code}
    """
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        ai_response = model.generate_content(prompt)
        ai_report = ai_response.text.strip()
        vulns_found = 1
    except Exception as e:
        ai_report = f"AI Comm Link Failed: {str(e)}"
        vulns_found = 0

    print(f"[🛡️ SECURITY AGENT] Analysis complete. Returning report to Dashboard.\n")
    
    return {
        "agent": "Security (Powered by Gemini)",
        "target": f"{target_repo}/vulnerable.py",
        "vulnerabilities": vulns_found,
        "report": ai_report
    }
