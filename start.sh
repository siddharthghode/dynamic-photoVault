#!/bin/bash

echo "Starting Photography CMS..."

# Start Spring Boot backend in background
echo "[Backend] Starting Spring Boot on http://localhost:8080"
mvn spring-boot:run &
BACKEND_PID=$!

# Wait for backend to be ready
echo "[Backend] Waiting for backend to start..."
until curl -s http://localhost:8080/health > /dev/null 2>&1; do
  sleep 2
done
echo "[Backend] Backend is up!"

# Start React frontend
echo "[Frontend] Starting React on http://localhost:5173"
cd frontend && npm install --silent && npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================="
echo "  Backend  → http://localhost:8080"
echo "  Frontend → http://localhost:5173"
echo "  Health   → http://localhost:8080/health"
echo "========================================="
echo "Press Ctrl+C to stop both servers"

# Stop both on Ctrl+C
trap "echo 'Stopping...'; kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM
wait
