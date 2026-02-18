# Day 56: The Deployment (Updates & Rollbacks) 📦

## The Concept
- **Deployments** manage ReplicaSets and allow for **Rolling Updates**.
- We can update an application without any downtime.

## Key Commands
- `kubectl apply -f my-deployment.yaml`: Create or update the deployment.
- `kubectl rollout status deployment/...`: Watch the update happen live.
- `kubectl rollout undo deployment/...`: **The "Undo" button.** Reverts to the previous version instantly.

## The Test
1. Deployed `pikachu003/my-custom-nginx:v1`.
2. Updated YAML to `nginx:alpine` and applied.
3. Saw the pods update one by one.
4. Ran `undo` to revert back to the original image.
