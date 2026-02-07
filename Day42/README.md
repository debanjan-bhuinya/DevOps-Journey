# Day 42: Solving Merge Conflicts ⚔️

## The Scenario
- Created a conflict by editing the same line in `contact.html` on two different branches.
- **Main Branch:** Changed email to `BOSS@...`
- **Feature Branch:** Changed email to `SUPPORT@...`

## The Conflict
- `git merge` failed with "CONFLICT (content)".
- File contained markers: `<<<<<<< HEAD`, `=======`, and `>>>>>>>`.

## The Fix
1. Opened the file: `nano contact.html`.
2. Deleted the markers and the unwanted code ("BOSS").
3. Saved the file.
4. Committed the fix: `git add .` -> `git commit`.
