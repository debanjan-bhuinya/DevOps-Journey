## Day 29: My First AWS Web Server

## Steps I followed:
1. Launched an EC2 Instance (Ubuntu 24.04, t3.micro).
2. Connected via SSH (EC2 Instance Connect).
3. Installed Nginx:
   `sudo apt update`
   `sudo apt install nginx -y`
4. Replaced the default index.html with my own code.
5. Fixed file permission errors using `sudo`.
6. Accessed the website using the Public IP.
