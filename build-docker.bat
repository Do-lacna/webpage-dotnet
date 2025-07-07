@echo off
REM Build script for Docker environment on Windows

echo Building Dolacna Webpage Docker image...

REM Navigate to the project root
cd /d "%~dp0"

REM Build the Docker image
docker build -f "Dolacna.Webpage/Dockerfile" -t dolacna-webpage .

if %ERRORLEVEL% EQU 0 (
    echo Docker build completed successfully!
    echo To run the container: docker run -p 8080:8080 dolacna-webpage
) else (
    echo Docker build failed with error code %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)

pause
