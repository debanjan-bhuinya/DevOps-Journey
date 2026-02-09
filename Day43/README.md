# Day 43: Git Time Travel (Revert vs Reset) ⏳

## 1. Git Revert (Safe)
- **Command:** `git revert <Commit_ID>`
- **Use Case:** When code is already pushed.
- **Result:** Creates a NEW commit that undoes the changes. History is safe.

## 2. Git Reset (Dangerous)
- **Command:** `git reset --hard HEAD~1`
- **Use Case:** Local mistakes only (never push after a reset unless you know what you are doing).
- **Result:** Deletes the commit and files. History is erased.

