# Day 52: Introduction to Kubernetes (K8s) ☸️

## The Concept
- **Docker** manages containers on ONE machine.
- **Kubernetes** orchestrates containers across MANY machines.
- It handles scaling, self-healing, and updates automatically.

## Tools Installed
1. **kubectl**: The command-line tool (The Remote Control).
2. **Minikube**: A local single-node cluster (The Playground).

## Key Commands
- `minikube start`: Spins up the cluster.
- `kubectl get nodes`: Checks the status of the worker nodes.
- `kubectl get pods -A`: Shows all running pods (including system ones).
