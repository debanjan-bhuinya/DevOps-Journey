# Day 51: Multi-Container Application (Capstone) 🏰

## The Architecture
- **Frontend:** Python Flask Web App (Custom Image).
- **Backend:** Redis Database (Official Image).
- **Orchestration:** Docker Compose.

## Files Created
1. **app.py**: The Python logic that connects to Redis.
2. **requirements.txt**: List of Python libraries (flask, redis).
3. **Dockerfile**: Instructions to build the Python image.
4. **docker-compose.yml**: The blueprint that links Web + Redis.

## Key Learning
- **Service Discovery:** The Python app found the database just by using the hostname `redis`. Docker's internal DNS handled the rest.
- **Persistence:** The counter value is stored in Redis, separate from the app logic.
