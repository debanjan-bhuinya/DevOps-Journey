# Day 48: The "Run Anywhere" Test 🌍

## The Concept
- We verified that a Docker image built on AWS can run locally without changes.
- **Goal:** Prove consistency across environments (Dev vs Prod).

## 1. Pulling from Hub
- Command: `docker pull pikachu003/my-custom-nginx:v1`
- Downloads the "frozen cake" from the registry.

## 2. Running Locally
- Command: `docker run -d -p 8080:80 --name my-local-site pikachu003/my-custom-nginx:v1`
- **Note:** We used port **8080** locally to avoid conflicts with Windows services.

## 3. Verification
- Accessed `http://localhost:8080` in Windows Browser.
- Result: Success! The exact same website appeared.
