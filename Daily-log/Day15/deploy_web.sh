#!/bin/bash

echo "--- Starting Automated Deployment ---"

# 1. Update the system (Day 05)
echo "Updating system..."
sudo apt update -y

# 2. Install Apache Web Server (Day 05)
echo "Installing Apache2..."
sudo apt install apache2 -y

# 3. Start and Enable the Service (Day 13 logic)
echo "Starting Web Server..."
sudo systemctl start apache2
sudo systemctl enable apache2

# 4. Deploy a Custom Website (Day 08 Redirection)
echo "Deploying the website..."
echo "<h1>Welcome to Pikachu's DevOps Server!</h1>" > index.html
echo "<p>Deployed automatically via Bash Script.</p>" >> index.html

# 5. Move file to the web folder (Day 02)
sudo mv index.html /var/www/html/index.html

echo "--- Deployment Complete! ---"
echo "Visit your website at: http://localhost"
