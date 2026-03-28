import requests
import re

def parse_github_url(url: str):
    # Extracts the 'owner' and 'repo' from a standard GitHub link
    # Example: https://github.com/debanjan-bhuinya/DevOps-Journey
    match = re.search(r"github\.com/([^/]+)/([^/]+)", url)
    if match:
        # Strip any trailing slashes or extra paths
        repo_name = match.group(2).split('/')[0]
        return match.group(1), repo_name
    return None, None

def get_target_files(owner: str, repo: str):
    print(f"[📡 GITHUB API] Fetching file tree for {owner}/{repo}...")
    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents"
    
    response = requests.get(api_url)
    if response.status_code != 200:
        raise Exception(f"Could not access GitHub repo. Error: {response.status_code}")
        
    files_to_scan = []
    # We only want to scan code and infrastructure, not READMEs or images!
    target_extensions = ['.py', '.js', '.ts', 'Dockerfile']
    
    for item in response.json():
        if item['type'] == 'file':
            # Check if it's a Dockerfile or ends with a target extension
            if item['name'] == 'Dockerfile' or any(item['name'].endswith(ext) for ext in target_extensions):
                files_to_scan.append(item['download_url'])
                
    return files_to_scan
