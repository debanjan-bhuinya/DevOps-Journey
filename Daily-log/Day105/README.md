### Day 105: The Actuation Loop (Giving Pikachu a Physical Body)
* **Goal:** Upgrade the Custom Kubernetes Operator from "Observer" to "Actuator" by dynamically provisioning physical infrastructure.
* **Go Refactoring:** Imported `corev1` and `apierrors` to the `pikachu_controller.go` to allow the Controller to interact with standard Kubernetes resources.
* **Actuation Logic:** Wrote the reconciliation loop to detect Custom Resources (`Pikachu`) and automatically deploy a physical Nginx Pod (`my-pikachu-body`) if it doesn't already exist.
* **Garbage Collection:** Implemented `OwnerReferences` via `ctrl.SetControllerReference`, linking the Pod's lifecycle directly to the Custom Resource. Proved that deleting the CRD automatically garbage-collects the associated Pods, ensuring zero-zombie infrastructure.
