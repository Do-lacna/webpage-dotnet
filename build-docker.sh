#!/bin/bash

# Build script for Docker environment
set -e

echo "Building Dolacna Webpage Docker image..."

# Navigate to the project root
cd "$(dirname "$0")"

# Build the Docker image
docker build -f "Dolacna.Webpage/Dockerfile" -t dolacna-webpage .

echo "Docker build completed successfully!"
echo "To run the container: docker run -p 8080:8080 dolacna-webpage"
