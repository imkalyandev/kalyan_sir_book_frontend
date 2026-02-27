@echo off
echo ========================================
echo   Seeding Database with Sample Books
echo ========================================
echo.

cd server

echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed
    pause
    exit /b 1
)

echo.
echo Running seed script...
echo.

python seed_books.py

echo.
echo ========================================
echo   Database seeding complete!
echo ========================================
pause
