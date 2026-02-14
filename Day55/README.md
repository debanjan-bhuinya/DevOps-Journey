# Day 55: The Service (The Front Door) 📞

## The Problem
- Pods are ephemeral (they die and change IPs).
- Users need a stable IP address to access the application.

## The Solution: Service
- A **Service** groups pods together using labels (e.g., `app: website`).
- It provides a stable IP and Load Balancing.

## The Manifest
- `kind: Service`
- `type: NodePort` (Opens a port on the worker node).
- `selector`: Connects the Service to the Pods.

## The Test
1. Launched 3 Pods (ReplicaSet).
2. Created a Service (`my-website-service`).
3. Used `minikube service ... --url` to access the site.
4. Result: Successfully reached the container via the Service IP.
