terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# 1. Connect to AWS (Mumbai Region for lowest latency!)
provider "aws" {
  region = "ap-south-1" 
}

# 2. Security Firewall: Open the blast doors for SSH and Port 8000
resource "aws_security_group" "auditor_sg" {
  name        = "auditor_web_sg"
  description = "Allow HTTP and SSH traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 3. Find the latest official Ubuntu operating system
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical's official AWS ID

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

# 4. The Server Itself (100% Free Tier Eligible!)
resource "aws_instance" "auditor_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.micro"
  vpc_security_group_ids = [aws_security_group.auditor_sg.id]

  # 🤖 THE MAGIC: This script runs automatically the second the server turns on!
  user_data = <<-BASH
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y docker.io
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu
              sudo docker run -d -p 8000:8000 pikachu003/auditor-backend:v1.0.0
              BASH

  tags = {
    Name = "Autonomous-Auditor-Production"
  }
}

# 5. Tell us the Public IP address when it's done!
output "public_ip" {
  value       = aws_instance.auditor_server.public_ip
  description = "The public IP address of the live cloud server"
}
