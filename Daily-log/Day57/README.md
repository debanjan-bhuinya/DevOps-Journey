# Day 57: Secrets & ConfigMaps (The Vault) 🤫

## The Problem
- Hardcoding passwords in YAML files is a security risk.
- Configuration (like environment variables) changes between Dev/Test/Prod.

## The Solution
1. **ConfigMap:** Stores non-sensitive data (Game Name, Language).
2. **Secret:** Stores sensitive data (Passwords, Keys) encoded in Base64.

## The Test
1. Created a Secret (`my-super-secret`) with a password.
2. Created a ConfigMap (`my-game-config`) with a game name.
3. Injected them into a Pod using `env` variables.
4. Exec'd into the pod (`kubectl exec`) and verified the variables existed.

