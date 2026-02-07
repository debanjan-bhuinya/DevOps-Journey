# Day 41: Git Branching Basics 🌿

## The Concept
- **Main:** The "Production" code (Safe, Working).
- **Feature Branch:** A parallel universe for testing new ideas safely.

## The Workflow
1. **Create Branch:** `git checkout -b feature-login` (Switch to new universe).
2. **Work:** Created `login.html` and committed changes.
3. **Switch Back:** `git checkout main` (File disappeared!).
4. **Merge:** `git merge feature-login` (Brought the file into Main).

## Why?
- Allows multiple developers to work on different features without breaking the main code.
