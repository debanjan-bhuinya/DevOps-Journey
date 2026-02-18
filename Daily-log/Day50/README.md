# Day 50: Docker Compose (The Orchestrator) 🎼

## The Problem
- `docker run` commands are long, hard to memorize, and prone to typos.
- Hard to manage multi-container apps (e.g., App + Database).

## The Solution: Docker Compose
- Uses a `docker-compose.yml` file to define the entire stack.
- **Infrastructure as Code:** The config is version-controlled.

## Key Commands
- `docker compose up -d`: Start everything in background.
- `docker compose ps`: Check status of the stack.
- `docker compose down`: Stop and remove containers/networks.

## My Configuration
Mapped Port 9090 -> 80 and attached a Volume.
