## Day 28: Launching My First EC2 Instance 🚀

## Instance Configuration
- **Name**: My-First-Server
- **OS**: Ubuntu Server 24.04 LTS (Free Tier Eligible)
- **Instance Type**: t3.micro (2 vCPU, 1 GB RAM)
- **Region**: Mumbai (ap-south-1)

## Network & Security
- **Security Group Rules**:
  - SSH (Port 22) - Allowed from Anywhere (0.0.0.0/0)
  - HTTP (Port 80) - Allowed from Anywhere
  - HTTPS (Port 443) - Allowed from Anywhere

## Access
- Created a new Key Pair (`MyKey.pem`).
- Connected using **EC2 Instance Connect** (Browser-based SSH).
