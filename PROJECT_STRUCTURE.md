# Project Structure

## Overview

Smart Parking Management System - Full-stack application with Spring Boot backend and React frontend.

## Directory Structure

```
smart-parking-system/
├── smart-parking-backend/          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/smartparking/
│   │   │   │   ├── config/         # Configuration classes
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   ├── JwtUtil.java
│   │   │   │   │   ├── JwtFilter.java
│   │   │   │   │   └── DataSeeder.java
│   │   │   │   ├── controller/     # REST Controllers
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── ParkingLotController.java
│   │   │   │   │   ├── BookingController.java
│   │   │   │   │   ├── PaymentController.java
│   │   │   │   │   └── AdminController.java
│   │   │   │   ├── dto/            # Data Transfer Objects
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   ├── BookingRequest.java
│   │   │   │   │   └── PaymentRequest.java
│   │   │   │   ├── exception/      # Exception Handlers
│   │   │   │   │   └── GlobalExceptionHandler.java
│   │   │   │   ├── model/          # Entity Models
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── ParkingLot.java
│   │   │   │   │   ├── Slot.java
│   │   │   │   │   ├── Booking.java
│   │   │   │   │   └── Payment.java
│   │   │   │   ├── repository/     # MongoDB Repositories
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── ParkingLotRepository.java
│   │   │   │   │   ├── BookingRepository.java
│   │   │   │   │   └── PaymentRepository.java
│   │   │   │   ├── scheduler/      # Scheduled Tasks
│   │   │   │   │   └── BookingScheduler.java
│   │   │   │   ├── service/        # Business Logic
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   ├── ParkingLotService.java
│   │   │   │   │   ├── BookingService.java
│   │   │   │   │   ├── PaymentService.java
│   │   │   │   │   └── DashboardService.java
│   │   │   │   ├── util/           # Utility Classes
│   │   │   │   │   └── QRCodeGenerator.java
│   │   │   │   └── SmartParkingApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       └── application-prod.properties
│   │   └── test/                   # Test files
│   ├── pom.xml                     # Maven dependencies
│   └── .gitignore
│
├── smart-parking-frontend/         # React Frontend
│   ├── src/
│   │   ├── components/             # Reusable Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ParkingCard.jsx
│   │   │   ├── SlotCard.jsx
│   │   │   ├── BookingModal.jsx
│   │   │   ├── PaymentForm.jsx
│   │   │   └── DashboardChart.jsx
│   │   ├── pages/                  # Page Components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── SearchParking.jsx
│   │   │   ├── BookingHistory.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/               # API Services
│   │   │   └── api.js
│   │   ├── App.jsx                 # Main App Component
│   │   ├── main.jsx                # Entry Point
│   │   └── index.css               # Global Styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .gitignore
│
├── README.md                        # Main documentation
├── QUICKSTART.md                    # Quick start guide
├── API_DOCUMENTATION.md             # API reference
├── TESTING.md                       # Testing guide
├── DEPLOYMENT.md                    # Deployment guide
└── PROJECT_STRUCTURE.md             # This file
```

## Component Descriptions

### Backend Components

#### Config Package
- **SecurityConfig**: Spring Security configuration with JWT
- **JwtUtil**: JWT token generation and validation
- **JwtFilter**: Request filter for JWT authentication
- **DataSeeder**: Seeds initial data on startup

#### Controller Package
- **AuthController**: User registration and login
- **ParkingLotController**: Parking lot operations
- **BookingController**: Booking management
- **PaymentController**: Payment processing
- **AdminController**: Admin-only operations

#### Service Package
- **AuthService**: Authentication business logic
- **ParkingLotService**: Parking lot management
- **BookingService**: Booking operations and auto-release
- **PaymentService**: Payment processing
- **DashboardService**: Analytics and statistics

#### Model Package
- **User**: User entity with authentication details
- **ParkingLot**: Parking location with embedded slots
- **Slot**: Individual parking slot (embedded)
- **Booking**: Booking record with QR code
- **Payment**: Payment transaction record

#### Repository Package
- MongoDB repositories using Spring Data MongoDB
- Custom query methods for complex operations

### Frontend Components

#### Components
- **Navbar**: Navigation bar with authentication
- **ParkingCard**: Display parking lot information
- **SlotCard**: Display individual slot status
- **BookingModal**: Booking confirmation dialog
- **PaymentForm**: Payment details form
- **DashboardChart**: Analytics visualization

#### Pages
- **Login**: User authentication page
- **Register**: User registration page
- **UserDashboard**: User home page
- **SearchParking**: Search and book parking
- **BookingHistory**: View user bookings
- **AdminDashboard**: Admin analytics and management

#### Services
- **api.js**: Axios configuration and API methods

## Data Flow

### User Booking Flow
```
User → SearchParking → Select Lot → View Slots → 
Select Slot → BookingModal → Payment → Confirmation → 
QR Code Generation → BookingHistory
```

### Admin Flow
```
Admin → AdminDashboard → View Analytics → 
Create Parking Lot → Add Slots → View Bookings
```

### Authentication Flow
```
Login/Register → JWT Token → LocalStorage → 
API Requests (with Bearer Token) → Protected Routes
```

## Key Features Implementation

### JWT Authentication
1. User logs in with credentials
2. Backend validates and generates JWT
3. Frontend stores token in localStorage
4. Token sent in Authorization header for all requests
5. Backend validates token on each request

### Auto-Release Booking
1. Scheduler runs every 5 minutes
2. Checks for bookings older than 15 minutes without payment
3. Cancels unpaid bookings
4. Releases slots back to AVAILABLE

### QR Code Generation
1. Booking created successfully
2. QRCodeGenerator creates QR with booking ID
3. QR code stored as base64 in booking
4. Displayed in booking history for entry validation

### Real-time Slot Updates
1. User books a slot
2. Slot status updated to BOOKED
3. Available slots count decremented
4. Changes reflected immediately in database
5. Other users see updated availability

## Technology Stack Details

### Backend Technologies
- **Spring Boot 3.2.0**: Application framework
- **Spring Data MongoDB**: Database integration
- **Spring Security**: Authentication and authorization
- **JWT (jjwt 0.11.5)**: Token-based authentication
- **Lombok**: Reduce boilerplate code
- **ZXing**: QR code generation
- **Maven**: Dependency management

### Frontend Technologies
- **React 18**: UI library
- **React Router 6**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS
- **Chart.js**: Data visualization
- **Vite**: Build tool and dev server

### Database
- **MongoDB Atlas**: Cloud-hosted MongoDB
- **Collections**: users, parkingLots, bookings, payments

## API Architecture

### RESTful Principles
- Resource-based URLs
- HTTP methods (GET, POST, DELETE)
- JSON request/response format
- Stateless authentication (JWT)
- Proper HTTP status codes

### Security Layers
1. **CORS**: Configured for frontend origin
2. **JWT**: Token-based authentication
3. **BCrypt**: Password encryption
4. **Role-based**: USER and ADMIN roles
5. **Filter**: JWT validation on each request

## Development Workflow

### Backend Development
1. Create model/entity
2. Create repository interface
3. Implement service logic
4. Create controller endpoints
5. Test with Postman/cURL
6. Add error handling

### Frontend Development
1. Create component/page
2. Add routing
3. Implement API calls
4. Add state management
5. Style with Tailwind
6. Test in browser

## Build and Deployment

### Backend Build
```bash
mvn clean package
# Creates: target/smart-parking-backend-1.0.0.jar
```

### Frontend Build
```bash
npm run build
# Creates: dist/ folder with static files
```

## Environment Configuration

### Development
- Backend: application-dev.properties
- Frontend: .env.development
- Database: MongoDB Atlas dev cluster

### Production
- Backend: application-prod.properties
- Frontend: .env.production
- Database: MongoDB Atlas prod cluster

## Monitoring and Logging

### Backend Logging
- Spring Boot default logging
- Log levels: DEBUG (dev), INFO (prod)
- Exception logging in GlobalExceptionHandler

### Frontend Logging
- Console.log for development
- Error boundaries for production
- API error handling

## Future Enhancements

### Potential Features
- Email notifications
- SMS alerts
- Mobile app (React Native)
- Payment gateway integration
- Advanced analytics
- Parking reservation system
- Multi-language support
- Dark mode
- Push notifications
- Integration with maps API

### Technical Improvements
- Unit tests (JUnit, Jest)
- Integration tests
- E2E tests (Cypress)
- CI/CD pipeline
- Docker containerization
- Kubernetes deployment
- Redis caching
- Rate limiting
- API documentation (Swagger)
- Performance monitoring
