@echo off
echo ========================================
echo   Python FastAPI Backend - Quick Start
echo ========================================
echo.

cd server

echo [1/3] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)
echo ✅ Python found
echo.

echo [2/3] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed
echo.

echo [3/3] Starting FastAPI server...
echo.
echo ========================================
echo   Server starting on http://localhost:5000
echo   API Docs: http://localhost:5000/docs
echo   Press Ctrl+C to stop
echo ========================================
echo.

python run.py
