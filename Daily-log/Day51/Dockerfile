# Use lightweight Python image
FROM python:3.9-alpine

# Set working directory inside container
WORKDIR /code

# Install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the code
COPY . .

# Command to run the app
CMD ["flask", "run", "--host=0.0.0.0"]
