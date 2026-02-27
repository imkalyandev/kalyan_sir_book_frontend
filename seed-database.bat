@echo off
echo ====================================
echo   Seeding Database with Sample Books
echo ====================================
echo.
cd server
node seedBooks.js
cd ..
echo.
echo Press any key to exit...
pause > nul
