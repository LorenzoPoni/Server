@echo off

cd /d "%~dp0"

start "Auth Service" cmd /k "cd backend\auth-service && node src\authserver.js"

start "Service" cmd /k "cd backend\service && node src\app.js"

start "Gateway" cmd /k "cd backend\gateway && node src\gateway.js"

if exist backend\wanted-service\server.py (
    start "Wanted Service" cmd /k "cd backend\wanted-service && python server.py"
)

pause
