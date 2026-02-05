# Day 36: Deploying with SCP 🚀

## The Mission
- Created a local HTML portfolio.
- Uploaded it to the remote server using **SCP** (Secure Copy).

## The Commands
1. **Upload:** `scp -i ~/MyKey.pem portfolio.html ubuntu@IP:/home/ubuntu/`
   - *Note:* Cannot upload directly to `/var/www/html` (Permission Denied).
2. **Deploy:** `sudo mv portfolio.html /var/www/html/index.html`
   - Moved the file from Home to the Web folder, overwriting the default page.

## 🐛 Troubleshooting: The "Mojibake" Error
- **Issue:** Emojis appeared as strange symbols (e.g., `Ã°Å¸Å¡â‚¬`).
- **Cause:** Browser didn't know the file was UTF-8.
- **Fix:** Added `<meta charset="UTF-8">` inside the `<head>` tag.
