# Day 97: Infrastructure as Code (Terraform Basics) 🏗️☁️

Today, I transitioned from manual infrastructure configuration to Infrastructure as Code (IaC) by deploying HashiCorp Terraform.

### **Today's Achievements:**
1. **Toolchain Installation:** Installed and verified the HashiCorp Terraform CLI within the local environment.
2. **Declarative Configuration:** Engineered a `main.tf` blueprint utilizing the HashiCorp Configuration Language (HCL) to define the desired state of the application.
3. **Provider Integration:** Configured the `kreuzwerker/docker` provider to interact directly with the local Docker daemon socket.
4. **The IaC Lifecycle:** Successfully executed the `init`, `plan`, and `apply` workflow, prompting Terraform to autonomously retrieve the secured `v1.0.0` image from the remote Docker Hub registry and deploy it as an isolated production resource.

The infrastructure deployment process is now fully automated, reproducible, and version-controlled.
