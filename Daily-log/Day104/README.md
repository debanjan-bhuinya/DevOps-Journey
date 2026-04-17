### Day 104: Building a Custom Kubernetes Operator
* **Goal:** Create a Custom Resource Definition (CRD) and write a live Go-based Controller.
* **Initialization:** Bootstrapped the `pikachu-operator` using Operator SDK.
* **Debugging:** Resolved Go compilation panics by patching the Makefile `CONTROLLER_TOOLS_VERSION` to `v0.15.0`.
* **CRD Creation:** Defined a `Pikachu` object with `Level`, `ElectricPower`, and `Health` fields.
* **The Brain:** Injected custom detection logic into the Go Controller and successfully tested the live Reconciliation Loop against the Minikube cluster.
