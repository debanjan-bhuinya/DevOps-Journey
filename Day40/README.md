# Day 40: Bash Scripting (Automation) 📜

## The Mission
- Create a "One-Click" script to update and maintain the server.

## The Script (`deploy.sh`)
- **Shebang:** `#!/bin/bash` (Tells Linux this is a script).
- **Commands:**
  - `sudo apt update -y` (Update apps).
  - `sudo apt install htop -y` (Install tools).
  - `sudo apt autoremove -y` (Clean junk).
  - `df -h` (Check disk space).

## Execution
1. **Create:** `nano deploy.sh`
2. **Permission:** `chmod +x deploy.sh` (Make executable).
3. **Run:** `./deploy.sh`
