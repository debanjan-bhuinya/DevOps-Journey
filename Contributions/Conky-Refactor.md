# Open Source Contribution: Conky (System Monitor)

## 🎯 The Mission
To improve the code quality of [Conky](https://github.com/brndnmtthws/conky), a popular system monitor for X11/Wayland.

## 🛠️ The Technical Work
- **Issue:** Found a `FIXME` in `src/data/os/linux.cc` where a "magic number" (256) was used for buffer allocation.
- **Solution:** Refactored the code to use a named constant `BUF_SIZE`, improving maintainability and safety.
- **Tools Used:** Vim, CMake, Make, GDB, Git.

## 🔗 Proof of Work
- **Pull Request:** [View my PR #2320 on GitHub](https://github.com/brndnmtthws/conky/pull/2320)
- **Status:** ✅ CI/CD Pipeline Passed (Ubuntu 22.04/24.04 Builds)

## 🎓 Key Learnings
1. **Compilation:** Built a complex C++ project from source using `cmake` and `make -j$(nproc)`.
2. **Dependency Hell:** Resolved missing libraries (`libxdamage-dev`, `gperf`) on Ubuntu.
3. **CI/CD:** Learned how GitHub Actions automatically verifies code on different OS versions.
