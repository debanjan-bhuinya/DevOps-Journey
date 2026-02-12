# Day 47: Pushing to Docker Hub 🌍

## 1. Login
- Command: `docker login`
- (Used browser authentication code).

## 2. Tagging
- Before pushing, we must label the image with our username.
- `docker tag my-custom-nginx pikachu003/my-custom-nginx:v1`

## 3. Pushing
- Uploads the image to the registry.
- `docker push pikachu003/my-custom-nginx:v1`

## Result
- The image is now globally accessible.
- Anyone can run it via: `docker run pikachu003/my-custom-nginx:v1`
