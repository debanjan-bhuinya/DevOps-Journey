terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

# Tell Terraform to connect to your local Docker daemon
provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# Define the exact image you pushed to Docker Hub yesterday!
resource "docker_image" "auditor_backend" {
  name         = "pikachu003/auditor-backend:v1.0.0"
  keep_locally = false
}

# Define the infrastructure (a container acting as a server)
resource "docker_container" "production_server" {
  image = docker_image.auditor_backend.image_id
  name  = "tf-production-auditor"
  ports {
    internal = 8000
    external = 8080
  }
}
