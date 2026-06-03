# 🅿️ Smart Parking System

A full-stack smart parking management system built with **Spring Boot** (backend) and **React** (frontend), deployed on **Render** + **Vercel**.

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| Frontend | https://parking-system-o1w2.vercel.app |
| Backend API | https://parking-system-2-rzoy.onrender.com/api |

---

## ✨ Features

### User Features
- 🔐 Register & Login with JWT authentication
- 🅿️ Browse 7 parking locations across Bengaluru
- 📍 View available/booked slots in real-time
- 🚗 Book a slot with vehicle number
- ⭐ Recommended slot highlighted automatically
- ⏱️ Live countdown timer on active bookings
- ⏩ Extend booking time
- 💳 Stripe payment integration (test mode)
- 🧾 Payment receipt with QR code
- 📋 Booking history with CSV export
- ❌ Cancel active bookings

### Admin Features
- 🔒 Separate admin login/register with secret code
- 📊 Dashboard with analytics (total bookings, revenue, utilization)
- 📷 QR code scanner to verify customer bookings
- 🏢 Manage parking lots (add, view occupancy)
- 🔧 Block/unblock individual slots (maintenance mode)
- 📋 All bookings table with CSV export
- 🚗 Vehicle number visible per booking

### System Features
- ⏰ Auto-complete expired bookings every 1 minute
- 🔄 Orphaned slot reconciliation (fixes stale BOOKED slots)
- 🌏 All times displayed in IST (Asia/Kolkata)
- 🎨 Beautiful animations on all pages
- 📸 Parking & location images as backgrounds
- 📱 Responsive design (mobile-friendly)

---

## 🏙️ Parking Locations (Bengaluru)

| # | Location | Address | Slots | Price |
|---|----------|---------|-------|-------|
| 1 | Phoenix Marketcity Mall | Whitefield Main Road, Mahadevapura | 60 | ₹4/hr |
| 2 | Nexus Shantiniketan Mall | ITPL Main Road, Whitefield | 50 | ₹3.5/hr |
| 3 | Forum Value Mall | Whitefield Road, Mahadevapura | 45 | ₹3/hr |
| 4 | PVR Cinemas - Orion Mall | Dr. Rajkumar Road, Rajajinagar | 40 | ₹5/hr |
| 5 | INOX Multiplex - Garuda Mall | Magrath Road, Ashok Nagar | 35 | ₹5/hr |
| 6 | Lulu Mall Parking | Sarjapur Main Road, Bellandur | 70 | ₹4.5/hr |
| 7 | Cinepolis - Elements Mall | Thanisandra Main Road, Nagawara | 40 | ₹4/hr |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Spring Boot 3.2, Java 21 |
| Database | MongoDB Atlas |
| Auth | JWT (JSON Web Tokens) |
| Payments | Stripe (test mode) |
| QR Code | ZXing (backend), html5-qrcode (frontend) |
| Deployment | Render (backend), Vercel (frontend) |

---

## 🚀 Running Locally

### Prerequisites
- Java 21+
- Maven
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Backend

```powershell
cd smart-parking-backend
$env:STRIPE_SECRET_KEY="your_stripe_secret_key"
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`

### Frontend

```powershell
cd smart-parking-frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

### Environment Variables

**Backend** (set as env vars or in `application.properties`):
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`.env` file):
```
VITE_API_URL=http://localhost:8080/api
```

---

## 📁 Project Structure

```
Parking-System/
├── smart-parking-backend/
│   ├── src/main/java/com/smartparking/
│   │   ├── config/          # Security, JWT, DataSeeder, Stripe
│   │   ├── controller/      # Auth, Booking, ParkingLot, Admin, Payment
│   │   ├── dto/             # Request DTOs
│   │   ├── model/           # Booking, ParkingLot, Slot, User, Payment
│   │   ├── repository/      # MongoDB repositories
│   │   ├── scheduler/       # Auto-release expired bookings
│   │   ├── service/         # Business logic
│   │   └── util/            # QR code generator
│   └── src/main/resources/
│       └── application.properties
├── smart-parking-frontend/
│   └── src/
│       ├── components/      # Navbar, BookingModal, ParkingCard, QRScanner, etc.
│       ├── pages/           # Login, Register, Dashboard, AdminDashboard, etc.
│       └── services/        # API calls (api.js)
├── Dockerfile               # Docker build for Render
└── render.yaml              # Render deployment config
```

---

## 🔑 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smartparking.com | admin123 |
| User | user@smartparking.com | user123 |

**Admin Registration Secret Code:** `smartparking@admin`

---

## 🚢 Deployment

### Backend → Render
1. Connect GitHub repo to Render
2. Select **Docker** runtime
3. Add environment variables
4. Deploy — Render uses `Dockerfile` in root

### Frontend → Vercel
1. Connect GitHub repo to Vercel
2. Set root directory to `smart-parking-frontend`
3. Add `VITE_API_URL` environment variable pointing to Render backend
4. Deploy

---

## 📱 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | Public |
| POST | `/api/auth/login` | Login | Public |
| GET | `/api/parking-lots` | Get all lots | User |
| GET | `/api/parking-lots/:id/slots` | Get slots | User |
| POST | `/api/bookings` | Create booking | User |
| GET | `/api/bookings/user/:id` | User bookings | User |
| PUT | `/api/bookings/:id/extend` | Extend booking | User |
| DELETE | `/api/bookings/:id` | Cancel booking | User |
| GET | `/api/admin/bookings` | All bookings | Admin |
| GET | `/api/admin/analytics` | Dashboard stats | Admin |
| PUT | `/api/admin/slot/block` | Block a slot | Admin |
| PUT | `/api/admin/slot/unblock` | Unblock a slot | Admin |

---

## 👨‍💻 Author

**Chinnam Srujan**
- GitHub: [@ChinnamSrujan](https://github.com/ChinnamSrujan)
