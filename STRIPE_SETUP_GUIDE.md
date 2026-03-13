# 💳 Stripe Payment Integration Guide

## Overview

The Smart Parking System now includes **Stripe payment gateway** integration for secure online payments.

---

## 🔑 Getting Stripe API Keys

### 1. Create Stripe Account
1. Go to https://stripe.com
2. Click "Sign up" or "Start now"
3. Complete registration
4. Verify your email

### 2. Get API Keys
1. Login to Stripe Dashboard: https://dashboard.stripe.com
2. Click "Developers" in the left sidebar
3. Click "API keys"
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`) - For frontend
   - **Secret key** (starts with `sk_test_...`) - For backend

### 3. Test Mode vs Live Mode
- **Test Mode**: Use for development (keys start with `pk_test_` and `sk_test_`)
- **Live Mode**: Use for production (keys start with `pk_live_` and `sk_live_`)

---

## ⚙️ Configuration

### Backend Configuration

1. **Open:** `smart-parking-backend/src/main/resources/application.properties`

2. **Update Stripe Secret Key:**
```properties
stripe.api.key=sk_test_YOUR_SECRET_KEY_HERE
```

**OR** set as environment variable:
```bash
export STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
```

### Frontend Configuration

1. **Open:** `smart-parking-frontend/src/components/BookingModal.jsx`

2. **Update line 6:**
```javascript
const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
```

---

## 🚀 Installation

### Backend
Already configured! The Stripe Java library is included in `pom.xml`.

### Frontend
Install Stripe dependencies:
```bash
cd smart-parking-frontend
npm install
```

This will install:
- `@stripe/stripe-js`
- `@stripe/react-stripe-js`

---

## 🎯 How It Works

### Payment Flow

1. **User Books Slot**
   - Selects parking slot
   - Chooses duration
   - Clicks "Proceed to Payment"

2. **Payment Intent Created**
   - Frontend requests payment intent from backend
   - Backend creates Stripe Payment Intent
   - Returns `clientSecret` to frontend

3. **User Enters Card Details**
   - Stripe secure card input form
   - Card details never touch your server
   - PCI compliance handled by Stripe

4. **Payment Confirmed**
   - Stripe processes payment
   - Frontend receives confirmation
   - Backend saves payment record
   - Booking confirmed with QR code

---

## 💳 Test Cards

Use these test card numbers in **Test Mode**:

### Successful Payments
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### Declined Payment
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
```

### Requires Authentication (3D Secure)
```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
```

More test cards: https://stripe.com/docs/testing

---

## 🔒 Security Features

### PCI Compliance
- ✅ Card details handled by Stripe
- ✅ No card data stored on your server
- ✅ Stripe Elements for secure input
- ✅ HTTPS required in production

### Payment Intent
- ✅ Server-side payment creation
- ✅ Client-side confirmation
- ✅ Prevents unauthorized charges
- ✅ Idempotent operations

### Authentication
- ✅ JWT token required
- ✅ User verification
- ✅ Booking validation
- ✅ Amount verification

---

## 📊 Features Implemented

### Backend
- ✅ Stripe configuration
- ✅ Payment Intent creation
- ✅ Payment processing
- ✅ Transaction ID storage
- ✅ Error handling

### Frontend
- ✅ Stripe Elements integration
- ✅ Card input form
- ✅ Payment confirmation
- ✅ Loading states
- ✅ Error messages
- ✅ Success handling

---

## 🧪 Testing the Integration

### 1. Start the Application
```bash
# Backend
cd smart-parking-backend
mvn spring-boot:run

# Frontend (new terminal)
cd smart-parking-frontend
npm run dev
```

### 2. Make a Test Booking
1. Login: http://localhost:3000
2. Search Parking → Select slot
3. Click "Proceed to Payment"
4. Enter test card: `4242 4242 4242 4242`
5. Expiry: `12/34`, CVC: `123`
6. Click "Pay"

### 3. Verify Payment
- Check Stripe Dashboard → Payments
- Check booking has payment ID
- Check QR code generated

---

## 📱 User Experience

### Payment Form Features
- Clean, modern design
- Real-time card validation
- Error messages
- Loading indicators
- Secure badge
- Amount display
- Cancel option

### Payment States
1. **Initial**: Shows booking details
2. **Payment**: Stripe card form
3. **Processing**: Loading spinner
4. **Success**: Booking confirmed
5. **Error**: Error message with retry

---

## 🔧 API Endpoints

### Create Payment Intent
```
POST /api/payments/create-intent
Authorization: Bearer {token}

Request:
{
  "bookingId": "booking123",
  "userId": "user456",
  "amount": 10.00,
  "paymentMethod": "STRIPE"
}

Response:
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### Process Payment
```
POST /api/payments/process
Authorization: Bearer {token}

Request:
{
  "bookingId": "booking123",
  "userId": "user456",
  "amount": 10.00,
  "paymentMethod": "STRIPE",
  "transactionId": "pi_xxx"
}

Response:
{
  "id": "payment123",
  "bookingId": "booking123",
  "amount": 10.00,
  "paymentStatus": "SUCCESS",
  "transactionId": "pi_xxx",
  "paymentTime": "2024-03-11T10:00:00"
}
```

---

## 🎨 Customization

### Change Currency
In `StripeService.java`, line 18:
```java
.setCurrency("usd") // Change to "eur", "gbp", etc.
```

### Styling Card Element
In `StripePaymentForm.jsx`, update `cardElementOptions`:
```javascript
const cardElementOptions = {
  style: {
    base: {
      fontSize: '18px',
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    },
  },
};
```

---

## 🐛 Troubleshooting

### "Invalid API Key"
- Check your secret key in `application.properties`
- Ensure no extra spaces
- Verify key starts with `sk_test_`

### "Publishable key not found"
- Check `BookingModal.jsx` line 6
- Ensure key starts with `pk_test_`
- Restart frontend after changes

### Payment Not Processing
- Check browser console for errors
- Verify backend is running
- Check Stripe Dashboard logs
- Ensure test mode is enabled

### Card Declined
- Use test card: `4242 4242 4242 4242`
- Check expiry is future date
- Verify CVC is 3 digits

---

## 📈 Production Checklist

Before going live:

- [ ] Get live API keys from Stripe
- [ ] Update `application.properties` with live secret key
- [ ] Update `BookingModal.jsx` with live publishable key
- [ ] Enable HTTPS on your domain
- [ ] Complete Stripe account verification
- [ ] Set up webhook endpoints
- [ ] Test with real cards (small amounts)
- [ ] Configure payout schedule
- [ ] Set up email receipts
- [ ] Review Stripe fees and pricing

---

## 💰 Stripe Pricing

### Standard Pricing
- **2.9% + $0.30** per successful card charge
- No setup fees
- No monthly fees
- No hidden costs

### International Cards
- Additional 1% for international cards
- Currency conversion fees may apply

More info: https://stripe.com/pricing

---

## 📚 Resources

### Documentation
- Stripe Docs: https://stripe.com/docs
- Stripe API: https://stripe.com/docs/api
- React Stripe.js: https://stripe.com/docs/stripe-js/react
- Test Cards: https://stripe.com/docs/testing

### Dashboard
- Stripe Dashboard: https://dashboard.stripe.com
- Payments: https://dashboard.stripe.com/payments
- Logs: https://dashboard.stripe.com/logs

### Support
- Stripe Support: https://support.stripe.com
- Community: https://stripe.com/community

---

## 🎉 Quick Start Summary

1. **Get Stripe Keys:**
   - Sign up at stripe.com
   - Get test keys from dashboard

2. **Configure Backend:**
   ```properties
   stripe.api.key=sk_test_YOUR_KEY
   ```

3. **Configure Frontend:**
   ```javascript
   loadStripe('pk_test_YOUR_KEY')
   ```

4. **Test Payment:**
   - Card: 4242 4242 4242 4242
   - Expiry: 12/34
   - CVC: 123

5. **Verify:**
   - Check Stripe Dashboard
   - Check booking has payment
   - Check QR code generated

---

## ✅ Integration Complete!

Your Smart Parking System now accepts secure payments through Stripe! 💳✨

**Next Steps:**
1. Get your Stripe API keys
2. Update configuration files
3. Test with test cards
4. Deploy to production with live keys
