# Quick Start Guide

Get the Smart Parking System running in 5 minutes!

## Prerequisites

- Java 17
- Node.js 18+
- Maven
- MongoDB Atlas account (free tier works)

## Step 1: Clone and Setup

```bash
# Navigate to project directory
cd smart-parking-system
```

## Step 2: Configure MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (if you don't have one)
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for testing)
5. Get your connection string

Your connection string should look like:
```
mongodb+srv://chinnamsrujan123:<password>@cluster0.8o30m.mongodb.net/
```

## Step 3: Start Backend

```bash
# Navigate to backend
cd smart-parking-backend

# Set your MongoDB password
export DB_PASSWORD=your_actual_password

# Run the application
mvn spring-boot:run
```

Wait for the message: `Started SmartParkingApplication`

The backend will:
- Start on http://localhost:8080
- Automatically create seed data (3 parking lots, 2 users)

## Step 4: Start Frontend

Open a new terminal:

```bash
# Navigate to frontend
cd smart-parking-frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Frontend will start on http://localhost:3000

## Step 5: Test the Application

### Login as User
1. Open http://localhost:3000
2. Click "Login"
3. Use credentials:
   - Email: `user@smartparking.com`
   - Password: `user123`

### Try These Features
- View parking locations
- Check available slots
- Make a booking
- View booking history

### Login as Admin
1. Logout
2. Login with:
   - Email: `admin@smartparking.com`
   - Password: `admin123`
3. View analytics dashboard
4. Create new parking lots

## Default Test Data

### Users
| Email | Password | Role |
|-------|----------|------|
| admin@smartparking.com | admin123 | ADMIN |
| user@smartparking.com | user123 | USER |

### Parking Lots
1. **Downtown Parking Plaza**
   - 30 slots
   - $5.00/hour
   - Location: 123 Main Street

2. **Airport Long-term Parking**
   - 50 slots
   - $3.50/hour
   - Location: Airport Road

3. **City Mall Parking**
   - 40 slots
   - $4.00/hour
   - Location: 456 Shopping Boulevard

## Common Issues

### Backend won't start
```bash
# Check if port 8080 is in use
netstat -an | grep 8080

# Make sure DB_PASSWORD is set
echo $DB_PASSWORD
```

### Frontend can't connect
- Verify backend is running on port 8080
- Check browser console for errors
- Try http://localhost:8080/api/parking-lots directly

### MongoDB connection fails
- Double-check your password
- Verify IP whitelist in MongoDB Atlas
- Check connection string format

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- See [TESTING.md](TESTING.md) for testing guide
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment

## Quick Commands Reference

### Backend
```bash
# Start backend
cd smart-parking-backend
export DB_PASSWORD=your_password
mvn spring-boot:run

# Build JAR
mvn clean package

# Run tests
mvn test
```

### Frontend
```bash
# Start frontend
cd smart-parking-frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   React     │ ──────> │ Spring Boot │ ──────> │  MongoDB    │
│  Frontend   │  HTTP   │   Backend   │  Driver │   Atlas     │
│  Port 3000  │         │  Port 8080  │         │   Cloud     │
└─────────────┘         └─────────────┘         └─────────────┘
```

## Support

If you encounter issues:
1. Check the console logs (both frontend and backend)
2. Verify all prerequisites are installed
3. Ensure MongoDB connection is working
4. Review the error messages carefully

Happy parking! 🚗
