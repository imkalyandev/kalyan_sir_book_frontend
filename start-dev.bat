@echo off
echo ====================================
echo   Book Selling Website - Development
echo ====================================
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ====================================
echo Servers Started!
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:5173
echo ====================================
echo.
echo Press any key to exit this window...
echo (Backend and Frontend will keep running)
pause > nul
