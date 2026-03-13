# Smart Parking Management System

A full-stack parking management system built with Java Spring Boot and React.js, using MongoDB Atlas as the database.

## Features

### User Features
- User registration and login with JWT authentication
- Search parking locations
- View available parking slots in real-time
- Reserve parking slots
- Make payments
- View booking history
- QR code generation for parking entry
- Cancel active bookings

### Admin Features
- Create and manage parking locations
- Add parking slots
- View all bookings
- System analytics dashboard
- Revenue statistics
- Parking utilization tracking

### Advanced Features
- Auto-release of unpaid bookings after 15 minutes
- QR code generation for entry validation
- Real-time slot availability
- Analytics dashboard with charts
- Role-based access control (USER/ADMIN)

## Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data MongoDB
- Spring Security with JWT
- MongoDB Atlas
- Maven
- Lombok
- ZXing (QR Code generation)

### Frontend
- React.js 18
- React Router
- Axios
- Tailwind CSS
- Chart.js
- Vite

## Database Schema

### Collections

**Users**
- _id, name, email, password, phone, role, createdAt

**ParkingLots**
- _id, locationName, address, totalSlots, availableSlots, pricePerHour, slots[]

**Bookings**
- _id, userId, parkingLotId, slotId, bookingStartTime, bookingEndTime, status, paymentId, qrCode, createdAt

**Payments**
- _id, bookingId, userId, amount, paymentMethod, paymentStatus, transactionId, paymentTime

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Maven
- MongoDB Atlas account

### Backend Setup

1. Navigate to backend directory:
```bash
cd smart-parking-backend
```

2. Set database password as environment variable:
```bash
export DB_PASSWORD=your_mongodb_password
```

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd smart-parking-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Parking
- `GET /api/parking-lots` - Get all parking lots
- `GET /api/parking-lots/{id}` - Get parking lot by ID
- `GET /api/parking-lots/{id}/slots` - Get slots for parking lot

### Booking
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user/{userId}` - Get user bookings
- `DELETE /api/bookings/{bookingId}` - Cancel booking

### Payment
- `POST /api/payments/process` - Process payment

### Admin
- `POST /api/admin/parking-lot` - Create parking lot
- `POST /api/admin/add-slot` - Add slot to parking lot
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/analytics` - Get system analytics

## Default Credentials

Create an admin user by registering with role "ADMIN" or use the following test accounts:

**Admin:**
- Email: admin@smartparking.com
- Password: admin123

**User:**
- Email: user@smartparking.com
- Password: user123

## MongoDB Connection

Update the MongoDB connection string in `application.properties`:
```
mongodb+srv://chinnamsrujan123:<password>@cluster0.8o30m.mongodb.net/smartparking
```

Replace `<password>` with your actual MongoDB Atlas password.

## Security

- Passwords encrypted using BCrypt
- JWT token-based authentication
- Role-based access control (RBAC)
- CORS configured for frontend access

## Project Structure

### Backend
```
src/main/java/com/smartparking/
├── config/          # Security, JWT configuration
├── controller/      # REST controllers
├── dto/            # Data transfer objects
├── exception/      # Exception handlers
├── model/          # Entity models
├── repository/     # MongoDB repositories
├── scheduler/      # Scheduled tasks
├── service/        # Business logic
└── util/           # Utility classes
```

### Frontend
```
src/
├── components/     # Reusable components
├── pages/         # Page components
└── services/      # API services
```

## License

MIT License
