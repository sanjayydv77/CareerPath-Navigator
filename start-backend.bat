@echo off
echo ====================================
echo  Future-Fit Backend Startup
echo ====================================
echo.

cd backend

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting backend server...
echo Backend will run on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo ====================================
echo.

call npm start
