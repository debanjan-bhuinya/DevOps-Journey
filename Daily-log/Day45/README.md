# Day 45: Running Nginx in Docker 🐳

## The Conflict
- I tried to run Nginx in Docker but got: `Error: Bind for 0.0.0.0:80 failed: port is already allocated`.
- **Reason:** My server already had Apache2 running on Port 80.
- **Fix:** I had to stop the system services:
  - `sudo systemctl stop apache2`
  - `sudo systemctl stop nginx`

## The Command
`docker run -d -p 80:80 --name my-web-server nginx`

## Flags Explained
- `-d`: **Detached** (Run in background).
- `-p 80:80`: **Port Mapping** (Send Server Port 80 -> Container Port 80).
- `--name`: Gives the container a nickname.
