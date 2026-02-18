#!/bin/bash
# Day 60: Helm - The Kubernetes Package Manager

# 1. Add the Bitnami Repository (The App Store)
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# 2. Install WordPress with a customized Service Type
# This replaces 100+ lines of YAML!
helm install my-blog bitnami/wordpress --set service.type=NodePort

# 3. Upgrade the Release (Day 2 Operations)
# Changing the NodePort to 30099 on the live cluster
helm upgrade my-blog bitnami/wordpress --set service.type=NodePort --set service.nodePorts.http=30099

# 4. Get the Admin Password
# kubectl get secret --namespace default my-blog-wordpress -o jsonpath="{.data.wordpress-password}" | base64 -d && echo
