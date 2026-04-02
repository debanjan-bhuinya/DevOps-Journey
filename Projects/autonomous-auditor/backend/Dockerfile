# 1. Use the Slim version to eradicate 90% of OS vulnerabilities!
FROM python:3.10-slim

# 2. Force the Linux OS to patch its core packages (Fixes the CRITICAL zlib1g)
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 3. Force Python to patch its core managers (Fixes the HIGH pip/wheel/jaraco)
RUN pip install --no-cache-dir --upgrade pip wheel jaraco.context setuptools

# ... keep the rest of your COPY and RUN commands below this exactly the same!

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
