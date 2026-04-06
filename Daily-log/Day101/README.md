# Day 101: The Public Cloud Migration (AWS EC2 & Terraform) ☁️🚀

Today, I successfully migrated the *Autonomous Auditor* backend from a local virtualized environment to the global public internet using Amazon Web Services (AWS).

### **Today's Achievements:**
1. **Cloud IAM Configuration:** Engineered an AWS Identity and Access Management (IAM) user with programmatic CLI access, adhering to the principle of least privilege versus root account usage.
2. **Infrastructure as Code (IaC):** Authored a production-grade Terraform blueprint (`main.tf`) utilizing the `hashicorp/aws` provider to deploy resources into the `ap-south-1` (Mumbai) region.
3. **Automated Provisioning:** Programmatically deployed a `t3.micro` EC2 instance wrapped in a custom AWS Security Group allowing ingress traffic on ports 22 (SSH) and 8000 (Application).
4. **Zero-Touch Bootstrapping:** Engineered an EC2 `user_data` bash script that autonomously installed the Docker engine, configured permissions, and pulled/executed the `v1.0.0` backend image the exact millisecond the cloud server booted.

The application is now accessible via a public IP address on the global internet, completely provisioned through declarative infrastructure code.
