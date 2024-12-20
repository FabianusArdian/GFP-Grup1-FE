
#!/bin/bash

# Start backend server
cd backend
source venv/bin/activate
python run.py &
BACKEND_PID=$!

# Start frontend server
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Handle cleanup on script exit
cleanup() {
    echo "Shutting down servers..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit
}

trap cleanup INT TERM

# Keep script running
wait
