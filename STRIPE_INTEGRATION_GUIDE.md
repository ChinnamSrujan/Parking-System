# 💳 Stripe Payment Integration Guide

## Overview

This guide will help you integrate Stripe payment gateway into the Smart Parking System for real payment processing.

---

## 📋 Prerequisites

1. **Stripe Account** - Sign up at https://stripe.com
2. **API Keys** - Get from Stripe Dashboard
3. **Test Mode** - Use test keys for development

---

## 🚀 Step 1: Create Stripe Account

### Sign Up
1. Go to https://stripe.com
2. Click "Start now" or "Sign up"
3. Fill in your details:
   - Email address
   - Full name
   - Country
   - Password
4. Verify your email

### Activate Your Account
1. Complete business details
2. Add bank account (for payouts)
3. Verify identity (for production)

---

## 🔑 Step 2: Get API Keys

### Access Dashboard
1. Login to https://dashboard.stripe.com
2. Click "Developers" in the left sidebar
3. Click "API keys"

### Copy Keys
You'll see two types of keys:

**Test Keys (for development):**
- Publishable key: `pk_test_...`
- Secret key: `sk_test_...`

**Live Keys (for production):**
- Publishable key: `pk_live_...`
- Secret key: `sk_live_...`

⚠️ **Important:** Never share your secret keys publicly!

---

## 🛠️ Step 3: Configure Application

### Backend Configuration

Add to `application.properties`:
```properties
# Stripe Configuration
stripe.api.key=sk_test_YOUR_SECRET_KEY_HERE
stripe.publishable.key=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

### Frontend Configuration

Create `.env` file in `smart-parking-frontend/`:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

---

## 💳 Step 4: Test Cards

Stripe provides test cards for development:

### Successful Payments
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### Declined Payments
```
Card Number: 4000 0000 0000 0002
(Card will be declined)
```

### Requires Authentication
```
Card Number: 4000 0025 0000 3155
(Will trigger 3D Secure)
```

---

## 🔧 Implementation Details

### Backend Components

1. **StripeService.java** - Handles Stripe API calls
2. **PaymentController.java** - Payment endpoints
3. **Stripe Dependency** - Added to pom.xml

### Frontend Components

1. **StripePaymentForm.jsx** - Stripe Elements form
2. **BookingModal.jsx** - Updated with Stripe
3. **Stripe.js** - Loaded from CDN

---

## 📝 How It Works

### Payment Flow

1. **User Books Slot:**
   - Selects parking slot
   - Chooses duration
   - Clicks "Confirm & Pay"

2. **Stripe Form Appears:**
   - User enters card details
   - Stripe validates card
   - Creates payment method

3. **Backend Processing:**
   - Creates Stripe PaymentIntent
   - Processes payment
   - Confirms booking

4. **Confirmation:**
   - User receives confirmation
   - Booking is activated
   - QR code is generated

---

## 🧪 Testing

### Test Payment Flow

1. **Make a Booking:**
   ```
   - Login: user@smartparking.com / user123
   - Search Parking
   - Select slot
   - Click "Confirm & Pay"
   ```

2. **Enter Test Card:**
   ```
   Card: 4242 4242 4242 4242
   Expiry: 12/34
   CVC: 123
   ZIP: 12345
   ```

3. **Complete Payment:**
   ```
   - Click "Pay Now"
   - Wait for confirmation
   - Check booking in "My Bookings"
   ```

4. **Verify in Stripe:**
   ```
   - Go to Stripe Dashboard
   - Click "Payments"
   - See your test payment
   ```

---

## 🔒 Security Best Practices

### Never Expose Secret Keys
❌ Don't commit secret keys to Git
❌ Don't share keys publicly
❌ Don't use in frontend code

✅ Use environment variables
✅ Use .env files (add to .gitignore)
✅ Use different keys for test/production

### PCI Compliance
- Stripe handles card data
- Never store card numbers
- Use Stripe Elements for forms
- Let Stripe handle security

---

## 🌐 Production Deployment

### Before Going Live

1. **Complete Stripe Verification:**
   - Verify business details
   - Add bank account
   - Complete identity verification

2. **Switch to Live Keys:**
   - Get live API keys
   - Update application.properties
   - Update frontend .env

3. **Test Thoroughly:**
   - Test with real cards (small amounts)
   - Verify webhooks work
   - Test refunds

4. **Enable Webhooks:**
   - Set up webhook endpoints
   - Handle payment events
   - Monitor webhook logs

---

## 📊 Stripe Dashboard

### Monitor Payments
- **Payments:** View all transactions
- **Customers:** Manage customer data
- **Disputes:** Handle chargebacks
- **Reports:** Financial reports

### Useful Features
- **Radar:** Fraud detection
- **Billing:** Subscription management
- **Connect:** Marketplace payments
- **Terminal:** In-person payments

---

## 🔄 Webhooks (Advanced)

### Setup Webhooks

1. **Create Endpoint:**
   ```
   URL: https://your-domain.com/api/stripe/webhook
   Events: payment_intent.succeeded, payment_intent.failed
   ```

2. **Handle Events:**
   ```java
   @PostMapping("/stripe/webhook")
   public ResponseEntity<String> handleWebhook(@RequestBody String payload) {
       // Verify signature
       // Process event
       // Update booking status
   }
   ```

---

## 💰 Pricing

### Stripe Fees
- **Per transaction:** 2.9% + $0.30
- **International cards:** +1.5%
- **Currency conversion:** +1%

### Example
```
Parking fee: $10.00
Stripe fee: $0.59 (2.9% + $0.30)
You receive: $9.41
```

---

## 🆘 Troubleshooting

### Payment Fails
- Check API keys are correct
- Verify test card number
- Check Stripe Dashboard logs
- Ensure internet connection

### Keys Not Working
- Verify you're using test keys in development
- Check keys are copied correctly
- Ensure no extra spaces
- Try regenerating keys

### Frontend Errors
- Check VITE_STRIPE_PUBLISHABLE_KEY is set
- Verify .env file location
- Restart frontend after .env changes
- Check browser console

---

## 📚 Resources

### Official Documentation
- **Stripe Docs:** https://stripe.com/docs
- **API Reference:** https://stripe.com/docs/api
- **Testing:** https://stripe.com/docs/testing

### Support
- **Stripe Support:** https://support.stripe.com
- **Community:** https://stripe.com/community
- **Status:** https://status.stripe.com

---

## ✅ Quick Setup Checklist

- [ ] Create Stripe account
- [ ] Get API keys (test mode)
- [ ] Add keys to application.properties
- [ ] Add publishable key to .env
- [ ] Restart backend
- [ ] Restart frontend
- [ ] Test with card 4242 4242 4242 4242
- [ ] Verify payment in Stripe Dashboard
- [ ] Check booking created successfully

---

## 🎯 Next Steps

After basic integration:
1. Add webhook handling
2. Implement refunds
3. Add payment history
4. Set up recurring payments
5. Enable Apple Pay / Google Pay
6. Add invoice generation
7. Implement subscription plans

---

## 📞 Need Help?

If you encounter issues:
1. Check Stripe Dashboard logs
2. Review browser console
3. Check backend logs
4. Verify API keys
5. Test with different card
6. Contact Stripe support

---

**Ready to accept real payments! 💳✨**
