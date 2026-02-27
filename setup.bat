@echo off
echo ====================================
echo   Book Selling Website - Setup
echo ====================================
echo.

echo [1/4] Installing Frontend Dependencies...
call npm install
echo.

echo [2/4] Installing Backend Dependencies...
cd server
call npm install
cd ..
echo.

echo [3/4] Setup Instructions:
echo - Configure server/.env file with your credentials
echo - Start MongoDB service
echo - Run seed script: cd server && node seedBooks.js
echo.

echo [4/4] Setup Complete!
echo.
echo Next Steps:
echo 1. Edit server/.env file
echo 2. Run: start-dev.bat
echo.
pause
