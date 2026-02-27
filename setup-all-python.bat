@echo off
echo ========================================
echo   COMPLETE APPLICATION SETUP (Python)
echo ========================================
echo.

echo Step 1: Installing Backend Dependencies...
echo ------------------------------------------
cd server
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed
echo.

cd ..

echo Step 2: Installing Frontend Dependencies...
echo -------------------------------------------
npm install
if errorlevel 1 (
    echo ❌ Frontend installation failed
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
echo.

echo Step 3: Seeding Database...
echo ---------------------------
cd server
python seed_books.py
if errorlevel 1 (
    echo ⚠️ Database seeding had issues (MongoDB may not be running)
) else (
    echo ✅ Database seeded successfully
)
echo.

cd ..

echo ========================================
echo   ✅ SETUP COMPLETE!
echo ========================================
echo.
echo Next steps:
echo   1. Start MongoDB: mongod
echo   2. Configure server/.env file
echo   3. Run backend: start-backend-python.bat
echo   4. Run frontend: npm run dev
echo.
echo Or use the following command to start both:
echo   Run in separate terminals:
echo   - Terminal 1: start-backend-python.bat
echo   - Terminal 2: npm run dev
echo.
pause
