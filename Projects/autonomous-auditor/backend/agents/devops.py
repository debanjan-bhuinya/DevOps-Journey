import os
import requests
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def run_devops_scan(target_repo: str):
    print(f"\n[⚙️ DEVOPS AGENT] Analyzing infrastructure at: {target_repo}")
    
    try:
        response = requests.get(target_repo)
        if response.status_code == 200:
            live_code = response.text
        else:
            raise Exception("File not found on GitHub.")
            
    except Exception as e:
         return {"agent": "DevOps", "target": target_repo, "vulnerabilities": 0, "report": f"Download failed: {str(e)}"}

    prompt = f"""
    You are an elite Senior DevOps Engineer. 
    Analyze this configuration file or code. 
    Identify ONE missing DevOps best practice (e.g., missing Docker tags, running as root, hardcoded configs).
    Keep it to exactly one short sentence. 
    If it is perfectly optimized for production, reply EXACTLY with: "Infrastructure optimized perfectly. Ready for production."
    Code:
    {live_code}
    """
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        ai_response = model.generate_content(prompt)
        ai_report = ai_response.text.strip()
        issues_found = 0 if "optimized perfectly" in ai_report.lower() else 1
    except Exception as e:
        ai_report = f"AI Comm Link Failed: {str(e)}"
        issues_found = 0

    print(f"[⚙️ DEVOPS AGENT] Analysis complete. Returning report.\n")
    
    return {
        "agent": "DevOps (Powered by Gemini)",
        "target": target_repo,
        "vulnerabilities": issues_found,
        "report": ai_report
    }
