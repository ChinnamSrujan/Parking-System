# Smart Parking System - API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

All endpoints except `/auth/register` and `/auth/login` require JWT authentication.

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "USER"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "USER",
    "createdAt": "2024-03-10T10:30:00"
  }
}
```

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

---

## Parking Lot Endpoints

### Get All Parking Lots
**GET** `/parking-lots`

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "locationName": "Downtown Parking",
    "address": "123 Main St",
    "totalSlots": 50,
    "availableSlots": 30,
    "pricePerHour": 5.0,
    "slots": [...]
  }
]
```

### Get Parking Lot by ID
**GET** `/parking-lots/{id}`

**Response:** Single parking lot object

### Get Slots for Parking Lot
**GET** `/parking-lots/{id}/slots`

**Response:**
```json
[
  {
    "slotId": "slot-001",
    "slotNumber": "A1",
    "status": "AVAILABLE"
  },
  {
    "slotId": "slot-002",
    "slotNumber": "A2",
    "status": "BOOKED"
  }
]
```

---

## Booking Endpoints

### Create Booking
**POST** `/bookings`

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "parkingLotId": "507f1f77bcf86cd799439012",
  "slotId": "slot-001",
  "bookingStartTime": "2024-03-10T14:00:00",
  "bookingEndTime": "2024-03-10T16:00:00"
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "parkingLotId": "507f1f77bcf86cd799439012",
  "slotId": "slot-001",
  "bookingStartTime": "2024-03-10T14:00:00",
  "bookingEndTime": "2024-03-10T16:00:00",
  "status": "ACTIVE",
  "qrCode": "base64_encoded_qr_code",
  "createdAt": "2024-03-10T13:45:00"
}
```

### Get User Bookings
**GET** `/bookings/user/{userId}`

**Response:** Array of booking objects

### Cancel Booking
**DELETE** `/bookings/{bookingId}`

**Response:** Updated booking object with status "CANCELLED"

---

## Payment Endpoints

### Process Payment
**POST** `/payments/process`

**Request Body:**
```json
{
  "bookingId": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "amount": 10.0,
  "paymentMethod": "CARD"
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439014",
  "bookingId": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "amount": 10.0,
  "paymentMethod": "CARD",
  "paymentStatus": "SUCCESS",
  "transactionId": "txn_1234567890",
  "paymentTime": "2024-03-10T13:50:00"
}
```

---

## Admin Endpoints

**Note:** All admin endpoints require ADMIN role.

### Create Parking Lot
**POST** `/admin/parking-lot`

**Request Body:**
```json
{
  "locationName": "Downtown Parking",
  "address": "123 Main St",
  "totalSlots": 50,
  "pricePerHour": 5.0,
  "slots": [
    {
      "slotNumber": "A1",
      "status": "AVAILABLE"
    }
  ]
}
```

**Response:** Created parking lot object

### Add Slot to Parking Lot
**POST** `/admin/add-slot?parkingLotId={parkingLotId}`

**Request Body:**
```json
{
  "slotNumber": "A51",
  "status": "AVAILABLE"
}
```

**Response:** Updated parking lot object

### Get All Bookings
**GET** `/admin/bookings`

**Response:** Array of all booking objects

### Get Analytics
**GET** `/admin/analytics`

**Response:**
```json
{
  "totalBookings": 150,
  "activeBookings": 25,
  "totalRevenue": 1250.50,
  "todayBookings": 12,
  "utilizationRate": 65.5
}
```

---

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "error": "Error message description"
}
```

### Common HTTP Status Codes
- `200 OK` - Successful request
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Status Values

### Booking Status
- `ACTIVE` - Booking is active
- `COMPLETED` - Booking completed
- `CANCELLED` - Booking cancelled

### Slot Status
- `AVAILABLE` - Slot is available
- `BOOKED` - Slot is booked
- `OCCUPIED` - Slot is currently occupied

### Payment Status
- `SUCCESS` - Payment successful
- `FAILED` - Payment failed
- `PENDING` - Payment pending

---

## Rate Limiting

Currently no rate limiting is implemented. Consider implementing rate limiting for production use.

## Pagination

Currently no pagination is implemented. For production, consider adding pagination to list endpoints.
