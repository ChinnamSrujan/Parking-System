# 💳 Stripe Payment - Quick Start

## ✅ Setup Complete!

Stripe payment gateway is fully integrated and ready to test.

## 🚀 Test in 5 Steps

### Step 1: Start Servers (if not running)

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

### Step 2: Login
- Go to http://localhost:3000
- Email: `user@smartparking.com`
- Password: `user123`

### Step 3: Book a Slot
1. Click "Search Parking"
2. Click "View Slots" on any parking lot
3. Click a green (available) slot
4. Set duration (e.g., 2 hours)
5. Click "Proceed to Payment"

### Step 4: Enter Test Card
```
Card Number: 4242 4242 4242 4242
Expiry Date: 12/25
CVC: 123
ZIP Code: 12345
```

### Step 5: Complete Payment
- Click "Pay $X.XX"
- Wait for "Processing..."
- See "Booking and payment successful!" alert
- Check "Booking History" for your booking with QR code

## 🎯 What to Expect

### Payment Form
- Secure Stripe card input field
- Real-time validation
- "Secured by Stripe" badge
- Loading spinner during processing

### Success
- Success alert message
- Booking appears in history
- QR code generated
- Payment recorded in database

### Errors
- Red error message if card declined
- Try again with different card
- Check backend logs if issues persist

## 🧪 Test Cards

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 0002 | ❌ Declined |
| 4000 0000 0000 9995 | ❌ Insufficient Funds |

## 🔍 Verify Payment

### In Application
1. Go to "Booking History"
2. See your booking with "ACTIVE" status
3. QR code should be visible

### In Stripe Dashboard
1. Go to https://dashboard.stripe.com/test/payments
2. Login with your Stripe account
3. See the test payment listed
4. Click to view details

## 📁 Key Files

### Frontend
- `.env` - Stripe publishable key
- `BookingModal.jsx` - Payment flow
- `StripePaymentForm.jsx` - Card input

### Backend
- `application.properties` - Stripe secret key
- `StripeService.java` - Payment intent creation
- `PaymentController.java` - API endpoints

## 🐛 Troubleshooting

### "Stripe publishable key not found"
- Check `.env` file exists in `smart-parking-frontend/`
- Restart frontend server: `npm run dev`

### "Payment failed"
- Check backend is running on port 8080
- Check backend logs for errors
- Verify Stripe keys in `application.properties`

### Card input not showing
- Clear browser cache
- Check browser console for errors
- Ensure Stripe packages are installed

### Payment stuck on "Processing"
- Check network tab in browser dev tools
- Verify backend API is responding
- Check backend logs for Stripe errors

## 📚 More Information

- **STRIPE_TESTING_GUIDE.md** - Detailed testing instructions
- **STRIPE_INTEGRATION_COMPLETE.md** - Technical details
- **CURRENT_STATUS.md** - Overall system status

## ✅ Success Checklist

- [ ] Both servers running
- [ ] Can login successfully
- [ ] Can view parking lots
- [ ] Can select a slot
- [ ] Payment form appears
- [ ] Can enter card details
- [ ] Payment processes successfully
- [ ] Booking appears in history
- [ ] QR code is generated
- [ ] Payment in Stripe dashboard

## 🎉 Ready to Test!

Everything is configured and ready. Just follow the 5 steps above to test your first payment!

---

**Need Help?** Check the troubleshooting section or refer to STRIPE_TESTING_GUIDE.md
