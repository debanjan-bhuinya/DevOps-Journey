# Day 54: The ReplicaSet (Self-Healing) 🤖

## The Concept
- Pods are mortal (they die).
- **ReplicaSet** ensures a specific number of pod copies (`replicas`) are always running.
- If a pod is deleted, the ReplicaSet creates a replacement instantly.

## The Manifest
- `kind: ReplicaSet`
- `replicas: 3` (Target count)
- `selector`: Tells the ReplicaSet which pods to manage.

## The Test
1. Applied the manifest. Saw 3 pods start.
2. Manually deleted 1 pod.
3. ReplicaSet immediately launched a new one to maintain the count of 3.
