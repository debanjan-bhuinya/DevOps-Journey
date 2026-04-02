# Day 99: The Automation Engine (CI/CD with GitHub Actions) ⚙️🤖

Today, I eliminated manual DevSecOps toil by engineering a fully automated Continuous Integration (CI) pipeline using GitHub Actions.

### **Today's Achievements:**
1. **Secret Management:** Provisioned secure GitHub Actions secrets to safely inject Docker Hub credentials into the CI runners without exposing them in source code.
2. **Workflow Construction:** Authored a declarative `.github/workflows` YAML configuration to define the precise stages of the software supply chain.
3. **Automated Security Gates:** Integrated `Trivy` directly into the CI pipeline, configuring the runner to exit with code `1` (fail the build) if any `HIGH` or `CRITICAL` vulnerabilities are detected.
4. **Dynamic Tagging:** Utilized the unique GitHub SHA (`${{ github.sha }}`) to tag Docker images, ensuring absolute traceability between the source code commit and the final deployed artifact.

The application is now governed by an enterprise-grade, zero-touch deployment pipeline.
