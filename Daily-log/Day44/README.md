# Day 44: Installing Docker 🐳

## The Concept
- **Old Way:** Install software directly on the OS (messy, hard to remove).
- **New Way:** "Containers" (Isolated boxes with everything included).

## Installation (AWS Ubuntu)
1. Update: `sudo apt update`
2. Install: `sudo apt install docker.io -y`

## Permissions Fix
- To run Docker without `sudo`:
- `sudo usermod -aG docker $USER`
- `newgrp docker`

## Verification
- Run test container: `docker run hello-world`

