# Day 49: Docker Volumes (Data Persistence) 🧠

## The Problem: Amnesia
- Containers are stateless. If you delete them, their data is lost.
- **Test:** We wrote a file, deleted the container, and the file vanished.

## The Solution: Volumes
- A Volume is like an external hard drive managed by Docker.
- It survives even if the container is deleted.

## The Commands
1. **Create Volume:**
   `docker volume create my-brain`

2. **Run with Volume:**
   `docker run -d -p 8081:80 -v my-brain:/usr/share/nginx/html --name my-smart-site pikachu003/my-custom-nginx:v1`

3. **Verify:**
   - Created `secret.txt` inside the container.
   - Deleted container.
   - Started NEW container with SAME volume.
   - File `secret.txt` was still there!
