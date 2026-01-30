# 1. Start with a lightweight Python base
FROM python:alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the dependencies file
COPY requirements.txt .

# 4. Install the dependencies
RUN pip install -r requirements.txt

# 5. Copy the rest of the application code
COPY . .

# 6. Run the application
CMD ["python", "app.py"]
