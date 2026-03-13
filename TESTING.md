# Testing Guide

## Manual Testing Steps

### 1. Backend Testing

#### Start Backend
```bash
cd smart-parking-backend
export DB_PASSWORD=your_password
mvn spring-boot:run
```

Backend should start on `http://localhost:8080`

#### Test Endpoints with cURL

**Register User:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "phone": "1234567890",
    "role": "USER"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

Save the token from response.

**Get Parking Lots:**
```bash
curl -X GET http://localhost:8080/api/parking-lots \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Create Booking:**
```bash
curl -X POST http://localhost:8080/api/bookings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "parkingLotId": "PARKING_LOT_ID",
    "slotId": "SLOT_ID",
    "bookingStartTime": "2024-03-10T14:00:00",
    "bookingEndTime": "2024-03-10T16:00:00"
  }'
```

### 2. Frontend Testing

#### Start Frontend
```bash
cd smart-parking-frontend
npm install
npm run dev
```

Frontend should start on `http://localhost:3000`

#### Test User Flow

1. **Registration**
   - Navigate to `/register`
   - Fill in registration form
   - Submit and verify redirect to dashboard

2. **Login**
   - Navigate to `/login`
   - Use credentials: `user@smartparking.com` / `user123`
   - Verify redirect to user dashboard

3. **Search Parking**
   - Click "Search Parking" from dashboard
   - View available parking lots
   - Click "View Slots" on a parking lot
   - Verify slots are displayed

4. **Book Slot**
   - Click on an available (green) slot
   - Verify booking modal appears
   - Adjust duration
   - Click "Confirm & Pay"
   - Verify booking success message

5. **View Bookings**
   - Navigate to "My Bookings"
   - Verify booking appears in list
   - Check QR code is displayed
   - Test cancel booking functionality

6. **Admin Flow**
   - Logout and login as admin: `admin@smartparking.com` / `admin123`
   - Verify redirect to admin dashboard
   - Check analytics cards display correctly
   - Test "Add Parking Lot" functionality
   - Verify bookings table shows all bookings

### 3. Feature Testing

#### Auto-Release Booking
1. Create a booking without payment
2. Wait 15 minutes
3. Verify booking status changes to CANCELLED
4. Verify slot becomes AVAILABLE again

#### QR Code Generation
1. Create a booking
2. Navigate to booking history
3. Verify QR code is displayed
4. QR code should contain booking ID

#### Real-time Slot Updates
1. Open two browser windows
2. Book a slot in one window
3. Refresh parking lot in second window
4. Verify slot status updated to BOOKED

#### Payment Processing
1. Create a booking
2. Complete payment form
3. Verify payment record created
4. Verify booking linked to payment

### 4. Security Testing

#### JWT Authentication
```bash
# Try accessing protected endpoint without token
curl -X GET http://localhost:8080/api/parking-lots

# Should return 401 Unauthorized
```

#### Role-Based Access
```bash
# Try accessing admin endpoint with user token
curl -X GET http://localhost:8080/api/admin/analytics \
  -H "Authorization: Bearer USER_TOKEN"

# Should return 403 Forbidden
```

#### Password Encryption
- Check MongoDB database
- Verify passwords are hashed (BCrypt)
- Should not be readable

### 5. Database Verification

#### Connect to MongoDB Atlas
```bash
mongosh "mongodb+srv://cluster0.8o30m.mongodb.net/smartparking" --username chinnamsrujan123
```

#### Verify Collections
```javascript
// Show all collections
show collections

// Count documents
db.users.countDocuments()
db.parkingLots.countDocuments()
db.bookings.countDocuments()
db.payments.countDocuments()

// View sample data
db.users.findOne()
db.parkingLots.findOne()
```

### 6. Error Handling Testing

#### Test Invalid Login
- Use wrong credentials
- Verify error message displayed

#### Test Duplicate Email
- Register with existing email
- Verify error message

#### Test Booking Unavailable Slot
- Try booking already booked slot
- Verify error handling

#### Test Invalid Token
- Use expired or invalid JWT
- Verify 401 response

### 7. Performance Testing

#### Load Testing with Apache Bench
```bash
# Test login endpoint
ab -n 100 -c 10 -p login.json -T application/json \
  http://localhost:8080/api/auth/login

# Test get parking lots
ab -n 1000 -c 50 -H "Authorization: Bearer TOKEN" \
  http://localhost:8080/api/parking-lots
```

### 8. Browser Compatibility

Test on:
- Chrome
- Firefox
- Safari
- Edge

Verify:
- UI renders correctly
- All features work
- Responsive design on mobile

### 9. Automated Testing (Future)

#### Backend Unit Tests
```java
@Test
public void testUserRegistration() {
    // Test user registration logic
}

@Test
public void testBookingCreation() {
    // Test booking creation
}
```

#### Frontend Component Tests
```javascript
describe('ParkingCard', () => {
  it('renders parking lot information', () => {
    // Test component rendering
  });
});
```

### 10. Checklist

- [ ] User registration works
- [ ] User login works
- [ ] JWT authentication works
- [ ] Parking lots display correctly
- [ ] Slots show correct status
- [ ] Booking creation works
- [ ] Payment processing works
- [ ] QR code generation works
- [ ] Booking cancellation works
- [ ] Auto-release works (15 min)
- [ ] Admin dashboard displays analytics
- [ ] Admin can create parking lots
- [ ] Admin can view all bookings
- [ ] Role-based access control works
- [ ] Error messages display correctly
- [ ] Responsive design works
- [ ] All API endpoints return correct status codes

## Test Data

### Default Users
- Admin: `admin@smartparking.com` / `admin123`
- User: `user@smartparking.com` / `user123`

### Seeded Parking Lots
1. Downtown Parking Plaza - 30 slots - $5/hour
2. Airport Long-term Parking - 50 slots - $3.5/hour
3. City Mall Parking - 40 slots - $4/hour

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify DB_PASSWORD environment variable
- Check port 8080 is not in use

### Frontend won't connect to backend
- Verify backend is running on port 8080
- Check CORS configuration
- Verify API_BASE_URL in api.js

### Authentication fails
- Check JWT secret configuration
- Verify token is being sent in headers
- Check token expiration time

### Database connection fails
- Verify MongoDB Atlas credentials
- Check IP whitelist in MongoDB Atlas
- Verify network connectivity
