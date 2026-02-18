# Day 37: DNS Spoofing (Hosts File) 📒

## The Concept
- Computers look at a local file called `/etc/hosts` before asking the Internet for DNS.
- We can use this to create custom domain names for our test servers.

## The Hack
- **Command:** `sudo nano /etc/hosts`
- **Added:** `AWS_PUBLIC_IP   pikachu.dev`
- **Result:** Taught my local computer that `pikachu.dev` lives at my AWS IP address.

## Verification
- **Ping:** `ping pikachu.dev` (Resolved IP, but timed out due to AWS firewall).
- **Curl:** `curl -v http://pikachu.dev` (Success! Returned HTML).
- **Browser:** Failed because browsers often force HTTPS or use secure DNS.
