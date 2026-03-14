# Smart Parking Management System

A full-stack Smart Parking Management System built with **Spring Boot**, **React.js**, and **MongoDB Atlas**.

## Tech Stack

- **Backend:** Java 17, Spring Boot, Spring Security (JWT), MongoDB Atlas, Stripe
- **Frontend:** React.js, Vite, Tailwind CSS, Chart.js, Stripe Elements
- **Database:** MongoDB Atlas (Cloud)

## Features

- JWT-based authentication with role-based access (USER / ADMIN)
- Search and book parking slots across 7 real locations
- Stripe payment gateway integration
- QR code generation for each booking
- Built-in QR scanner for entry verification
- Admin dashboard with analytics and revenue stats
- Auto-release of unpaid bookings after 15 minutes

## Project Structure

```
Parking-System/
├── smart-parking-backend/        # Spring Boot API
│   ├── src/main/java/com/smartparking/
│   │   ├── config/               # Security, JWT, Stripe, DataSeeder
│   │   ├── controller/           # REST controllers
│   │   ├── service/              # Business logic
│   │   ├── repository/           # MongoDB repositories
│   │   ├── model/                # Data models
│   │   ├── dto/                  # Request/Response DTOs
│   │   ├── scheduler/            # Auto-release scheduler
│   │   ├── util/                 # QR code generator
│   │   └── exception/            # Global exception handler
│   └── src/main/resources/
│       └── application.properties
│
├── smart-parking-frontend/       # React + Vite app
│   ├── src/
│   │   ├── components/           # Navbar, BookingModal, QRScanner, etc.
│   │   ├── pages/                # Login, Register, Dashboard, etc.
│   │   └── services/             # Axios API client
│   └── .env.example
│
├── SETUP_INSTRUCTIONS.md
└── README.md
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- Maven
- MongoDB Atlas account
- Stripe account

### Backend Setup

1. Configure environment variables or create `application-local.properties`:

```properties
spring.data.mongodb.uri=your_mongodb_connection_string
stripe.api.key=your_stripe_secret_key
stripe.publishable.key=your_stripe_publishable_key
jwt.secret=your_jwt_secret
```

2. Run the backend:

```bash
cd smart-parking-backend
mvn spring-boot:run
```

> On Windows with Java 24, use:
> ```bash
> $env:MAVEN_OPTS='-Djavax.net.ssl.trustStoreType=Windows-ROOT'; mvn spring-boot:run
> ```

### Frontend Setup

1. Create `.env` in `smart-parking-frontend/`:

```env
VITE_API_URL=http://localhost:8080/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

2. Install dependencies and run:

```bash
cd smart-parking-frontend
npm install
npm run dev
```

### Access

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api

## Test Accounts

| Role  | Email                     | Password |
|-------|---------------------------|----------|
| User  | user@smartparking.com     | user123  |
| Admin | admin@smartparking.com    | admin123 |

## Stripe Test Cards

| Card Number          | Result              |
|----------------------|---------------------|
| 4242 4242 4242 4242  | Success             |
| 4000 0000 0000 0002  | Declined            |
| 4000 0000 0000 9995  | Insufficient Funds  |

## Parking Locations (Seeded)

| Location                    | Slots | Price/hr |
|-----------------------------|-------|----------|
| Phoenix Marketcity Mall     | 60    | $4.00    |
| Nexus Shantiniketan Mall    | 50    | $3.50    |
| Forum Value Mall            | 45    | $3.00    |
| PVR Cinemas - Orion Mall    | 40    | $5.00    |
| INOX Multiplex - Garuda Mall| 35    | $5.00    |
| Lulu Mall Parking           | 70    | $4.50    |
| Cinepolis - Elements Mall   | 40    | $4.00    |

## API Endpoints

| Method | Endpoint                        | Description           |
|--------|---------------------------------|-----------------------|
| POST   | /api/auth/register              | Register user         |
| POST   | /api/auth/login                 | Login                 |
| GET    | /api/parking-lots               | List parking lots     |
| GET    | /api/parking-lots/{id}/slots    | Get slots             |
| POST   | /api/bookings                   | Create booking        |
| GET    | /api/bookings/user/{userId}     | User bookings         |
| DELETE | /api/bookings/{bookingId}       | Cancel booking        |
| POST   | /api/payments/create-intent     | Create payment intent |
| POST   | /api/payments/process           | Process payment       |
| GET    | /api/admin/analytics            | Admin analytics       |
