# Day 46: Building My First Docker Image 🏗️

## 1. The Dockerfile
```dockerfile
FROM nginx:latest
RUN rm /usr/share/nginx/html/index.html
COPY index.html /usr/share/nginx/html/
