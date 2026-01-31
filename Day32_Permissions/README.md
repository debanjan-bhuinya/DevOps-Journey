# Day 32: Linux Permissions & Security 🔐

## The "400" Rule
- **SSH Keys must be secured.** If permissions are too open (like 666), SSH refuses to connect.
- **Command:** `chmod 400 MyKey.pem`
- **Result:** `-r--------` (Only I can read it).

## The Math (Chmod)
- **Read (r)** = 4
- **Write (w)** = 2
- **Execute (x)** = 1
- **400** = Owner (4) | Group (0) | Others (0)
