# Open Source Contribution: Conky (System Monitor)

## 🎯 The Mission
To improve the code quality of [Conky](https://github.com/brndnmtthws/conky), a popular system monitor for X11/Wayland.

## 🛠️ The Technical Work
- **Issue:** Found a `FIXME` in `src/data/os/linux.cc` where a "magic number" (256) was used for buffer allocation.
- **Solution:** Refactored the code to use a named constant `BUF_SIZE`, improving maintainability and safety.
- **Tools Used:** Vim, CMake, Make, GDB, Git.

## 🔗 Proof of Work
- **Pull Request:** [View my PR #2320 on GitHub](https://github.com/brndnmtthws/conky/pull/2320)
- **Status:** ❌ Closed (Valuable Lesson Learned)

## 🎓 Key Learnings
1. **Compilation:** Built a complex C++ project from source using `cmake` and `make -j$(nproc)`.
2. **Dependency Hell:** Resolved missing libraries (`libxdamage-dev`, `gperf`) on Ubuntu.
3. **CI/CD:** Learned how GitHub Actions automatically verifies code on different OS versions.

## 🧠 The Lesson (Post-Review)
The PR was closed by maintainers because the change (refactoring a magic number) was considered "low value" compared to the cost of review and CI resources.
**Key Takeaway:** In Open Source, prioritize fixing *functional bugs* (things that are broken) over *stylistic refactors* (things that look nicer). Readability changes often aren't worth the merge risk in legacy codebases.
