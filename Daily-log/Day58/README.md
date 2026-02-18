# Day 58: Persistent Volumes (The Hard Drive) 💾

## The Problem
- Pods are ephemeral. When they die, their internal files die.
- Databases need permanent storage.

## The Solution
1. **PersistentVolumeClaim (PVC):** A request for storage (e.g., 1GB).
2. **Volume Mount:** We attach this claim to a specific folder in the pod (e.g., `/data`).

## The Test
1. Created a PVC `my-data-claim`.
2. Launched a Pod, mounted the claim, and wrote a file to `/data/message.txt`.
3. Deleted the Pod.
4. Launched a **new** Pod attached to the **same** claim.
5. The file `message.txt` was still there! Data persisted.
