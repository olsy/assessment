# Use the official Python image as base image
FROM python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN /usr/local/bin/python -m pip install --upgrade pip

# Install the required packages
RUN pip3 install --no-cache-dir -r requirements.txt

ENV PATH="/app/alembic:${PATH}"

# Expose the port the app will listen on
EXPOSE 8000

# Start the app
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
