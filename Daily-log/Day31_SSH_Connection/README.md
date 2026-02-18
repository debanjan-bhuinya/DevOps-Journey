# Day 31: SSH Remote Access 📡

## The Milestone
- Moved from browser-based access to **SSH (Secure Shell)**.
- Connected to AWS EC2 directly from my local Linux terminal.

## Key Learnings
1. **Key Security**: Used `chmod 400 MyKey.pem` to secure the private key.
2. **File Transfer**: Used Python's `http.server` to move the key from Windows to Linux.
3. **Connection**: Connected using `ssh -i "MyKey.pem" ubuntu@<Public-IP>`.

## Verification
- Successfully navigated to `/var/www/html` to view my hosted website files.
