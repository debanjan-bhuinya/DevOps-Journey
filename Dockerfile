# 🚨 BAD PRACTICE 1: Using the massive, unpredictable 'latest' image
FROM python:latest

WORKDIR /app

# 🚨 BAD PRACTICE 2: Ruining Docker layer caching by copying everything first
COPY . /app
RUN pip install flask requests

# 🚨 BAD PRACTICE 3: We never switched away from the default 'root' user!
EXPOSE 8080
CMD ["python", "app.py"]
