# Day 53: The Pod (K8s Atom) 💊

## The Concept
- A **Pod** is the smallest deployable unit in Kubernetes.
- It wraps one or more containers (usually just one).
- It has its own private IP address.

## The Manifest (YAML)
We defined a Pod using `kind: Pod` and specified the image `pikachu003/my-custom-nginx:v1`.

## Key Commands
- `kubectl apply -f my-pod.yaml`: Create the pod from the file.
- `kubectl get pods`: Check status (Pending -> ContainerCreating -> Running).
- `kubectl port-forward my-k8s-site 8080:80`: Create a temporary tunnel to access the pod locally.
- `kubectl delete pod my-k8s-site`: Remove the pod.
