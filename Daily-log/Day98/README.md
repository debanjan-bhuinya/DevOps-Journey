# Day 98: The Fleet Admiral (Kubernetes Introduction) ☸️

Today, I migrated the application architecture from standard Docker environments into a highly available Kubernetes (K8s) cluster.

### **Today's Achievements:**
1. **Cluster Provisioning:** Deployed `Minikube` utilizing the Docker driver to establish a localized, single-node Kubernetes Control Plane.
2. **CLI Configuration:** Installed and configured `kubectl` to interact seamlessly with the Minikube API server.
3. **Declarative Manifests:** Authored a Kubernetes `Deployment` YAML manifest to programmatically define the desired state of the application.
4. **High Availability (HA):** Configured the deployment with `replicas: 2`, instructing the K8s scheduler to pull the hardened `v1.0.0` image from Docker Hub and distribute multiple identical Pods, ensuring zero-downtime architecture.

The application is now officially orchestrated, self-healing, and scalable.
