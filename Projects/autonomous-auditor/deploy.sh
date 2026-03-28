#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 [DEPLOYMENT] Starting Autonomous Auditor deployment sequence..."

# 1. Pull the absolute latest code from GitHub
echo "📥 [DEPLOYMENT] Fetching latest mission protocols from GitHub..."
git pull origin main

# 2. Shut down the currently running containers safely
echo "🛑 [DEPLOYMENT] Shutting down existing Docker fleet..."
docker compose down

# 3. Rebuild and launch the containers in 'detached' mode (-d)
# Detached mode means they run in the background forever!
echo "🏭 [DEPLOYMENT] Rebuilding and launching the fleet..."
docker compose up -d --build

echo "✅ [DEPLOYMENT] Autonomous Auditor is live and running in the cloud!"
