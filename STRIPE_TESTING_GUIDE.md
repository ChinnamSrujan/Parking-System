# Stripe Payment Integration - Testing Guide

## Setup Complete ✅

The Stripe payment gateway has been successfully integrated into the Smart Parking Management System.

## What Was Configured

### Backend (Spring Boot)
- ✅ Stripe Java SDK (v24.3.0) added to pom.xml
- ✅ Stripe API keys configured in application.properties
- ✅ StripeService.java created with payment intent functionality
- ✅ PaymentController.java has `/create-intent` endpoint
- ✅ PaymentService.java integrated with StripeService

### Frontend (React)
- ✅ @stripe/stripe-js and @stripe/react-stripe-js packages installed
- ✅ .env file created with Stripe publishable key
- ✅ StripePaymentForm.jsx component with card input
- ✅ BookingModal.jsx integrated with Stripe Elements
- ✅ SearchParking.jsx updated for payment flow

## How to Test

### 1. Restart Both Servers

**Backend:**
```bash
cd smart-parking-backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd smart-parking-frontend
npm run dev
```

### 2. Login to the Application

Navigate to http://localhost:3000 and login with:
- Email: `user@smartparking.com`
- Password: `user123`

### 3. Book a Parking Slot

1. Click "Search Parking" in the navbar
2. Click "View Slots" on any parking lot
3. Click on an available (green) slot
4. Select duration (hours)
5. Click "Proceed to Payment"

### 4. Enter Test Card Details

Use Stripe's test card numbers:

**Successful Payment:**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Other Test Cards:**
- Declined: `4000 0000 0000 0002`
- Insufficient Funds: `4000 0000 0000 9995`
- 3D Secure: `4000 0027 6000 3184`

### 5. Complete Payment

1. Click "Pay $X.XX" button
2. Wait for processing
3. You should see "Booking and payment successful!" alert
4. Check "Booking History" to see your booking with QR code

## Payment Flow

```
User selects slot → BookingModal opens
    ↓
User sets duration → Clicks "Proceed to Payment"
    ↓
Booking created in backend → Booking ID returned
    ↓
StripePaymentForm shown → User enters card details
    ↓
Frontend calls /api/payments/create-intent
    ↓
Backend creates Stripe PaymentIntent → Returns clientSecret
    ↓
Frontend confirms payment with Stripe
    ↓
Stripe processes payment → Returns paymentIntent
    ↓
Frontend calls /api/payments/process with transaction ID
    ↓
Backend saves payment record → Updates booking status
    ↓
Success! User can view booking with QR code
```

## Verify Payment in Stripe Dashboard

1. Go to https://dashboard.stripe.com/test/payments
2. Login with your Stripe account
3. You should see the test payment listed
4. Click on it to see details

## Troubleshooting

### Frontend Issues

**Error: "Stripe publishable key not found"**
- Make sure `.env` file exists in `smart-parking-frontend/`
- Restart the frontend server after creating .env

**Error: "Cannot read properties of undefined"**
- Clear browser cache and localStorage
- Login again

### Backend Issues

**Error: "Invalid API Key"**
- Check `application.properties` has correct Stripe secret key
- Restart backend server

**Error: "Payment intent creation failed"**
- Verify Stripe keys are test keys (start with `sk_test_` and `pk_test_`)
- Check backend logs for detailed error

### Payment Issues

**Card declined**
- Use test card `4242 4242 4242 4242`
- Make sure expiry date is in the future

**Payment stuck on "Processing"**
- Check browser console for errors
- Check backend logs
- Verify backend is running on port 8080

## Test Checklist

- [ ] Backend server running on port 8080
- [ ] Frontend server running on port 3000
- [ ] Can login successfully
- [ ] Can view parking lots
- [ ] Can see available slots
- [ ] Booking modal opens
- [ ] Payment form shows Stripe card input
- [ ] Can enter test card details
- [ ] Payment processes successfully
- [ ] Booking appears in history
- [ ] QR code is generated
- [ ] Payment visible in Stripe dashboard

## Next Steps

Once testing is complete:

1. **Production Deployment:**
   - Replace test keys with live Stripe keys
   - Update environment variables
   - Enable webhook endpoints for payment confirmations

2. **Additional Features:**
   - Add payment receipts via email
   - Implement refund functionality
   - Add payment history for users
   - Support multiple payment methods

3. **Security:**
   - Never commit .env file to git
   - Use environment variables in production
   - Enable Stripe webhook signature verification

## Support

If you encounter any issues:
1. Check browser console for frontend errors
2. Check backend logs for API errors
3. Verify Stripe dashboard for payment status
4. Ensure all environment variables are set correctly
