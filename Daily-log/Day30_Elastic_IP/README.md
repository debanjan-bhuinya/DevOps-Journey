# Day 30: Elastic IPs (Static Addressing) 📍

## The Problem
- By default, EC2 instances get a new Public IP every time they restart.
- This makes hosting a website impossible because the address keeps changing.

## The Solution: Elastic IP
- **Elastic IP**: A static IPv4 address designed for dynamic cloud computing.
- **Cost Rule**: It is free ONLY if attached to a running instance. If the instance is stopped, AWS charges for holding the IP.

## Steps I Took
1. **Allocated** a new Elastic IP from the AWS Console.
2. **Associated** it with `My-First-Server`.
3. Verified the website loaded on the new permanent IP.
4. **Clean Up**: Disassociated and Released the IP to avoid charges.

