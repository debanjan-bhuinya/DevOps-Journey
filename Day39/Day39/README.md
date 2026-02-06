# Day 39: Automating with Cron 🤖

## The Mission
- Automate the Python script to run every single minute without human intervention.

## The Tool: Cron
- **Command:** `crontab -e` (Edit the Cron Table).
- **Syntax:** `* * * * * command_to_run` (Minute Hour Day Month Week).

## The Job
- **Code:** `* * * * * python3 /home/ubuntu/logic.py >> /home/ubuntu/server.log 2>&1`
- **Result:** The script runs every 60 seconds, and output is saved to `server.log`.
