# Day 33: Editing Files on Cloud (Nano) ☁️

## The Challenge
- Tried to edit `/var/www/html/index.html` but got "Permission Denied".
- Reason: The file belongs to `root`, and I am just `ubuntu`.

## The Solution: Sudo
- **Command:** `sudo nano index.html`
- **Sudo**: "SuperUser DO" (Administrator privileges).

## Nano Shortcuts
- **Ctrl + O**: Save (Write Out).
- **Ctrl + X**: Exit.
