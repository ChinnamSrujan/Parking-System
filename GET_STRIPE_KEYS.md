# 🔑 How to Get Your Stripe API Keys

## Quick Guide (5 Minutes)

### Step 1: Sign Up for Stripe
1. Go to: **https://stripe.com**
2. Click **"Start now"** or **"Sign up"**
3. Enter your email and create a password
4. Verify your email address

### Step 2: Access Dashboard
1. Login to: **https://dashboard.stripe.com**
2. You'll see the main dashboard

### Step 3: Get API Keys
1. Click **"Developers"** in the left sidebar
2. Click **"API keys"**
3. You'll see your keys:

```
Publishable key (starts with pk_test_)
Secret key (starts with sk_test_) - Click "Reveal test key"
```

### Step 4: Copy Your Keys

**Test Mode Keys (for development):**
```
Publishable key: pk_test_51Abc...xyz
Secret key: sk_test_51Abc...xyz
```

---

## 📋 What to Do With Keys

### Backend Configuration

Open: `smart-parking-backend/src/main/resources/application.properties`

Add these lines:
```properties
# Stripe Configuration
stripe.api.key=sk_test_YOUR_SECRET_KEY_HERE
stripe.publishable.key=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

Replace `YOUR_SECRET_KEY_HERE` with your actual secret key.

### Frontend Configuration

Create file: `smart-parking-frontend/.env`

Add this line:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

Replace `YOUR_PUBLISHABLE_KEY_HERE` with your actual publishable key.

---

## ⚠️ Important Notes

### Security
- ❌ **Never share your secret key publicly**
- ❌ **Never commit keys to Git**
- ✅ **Use environment variables**
- ✅ **Use .env files (add to .gitignore)**

### Test vs Live
- **Test keys** (pk_test_ / sk_test_) - For development
- **Live keys** (pk_live_ / sk_live_) - For production

**Always use test keys during development!**

---

## 🧪 Test Card Numbers

Once you have your keys, use these test cards:

### Successful Payment
```
Card Number: 4242 4242 4242 4242
Expiry: 12/34 (any future date)
CVC: 123 (any 3 digits)
ZIP: 12345 (any 5 digits)
```

### Declined Payment
```
Card Number: 4000 0000 0000 0002
```

---

## 🚀 After Getting Keys

1. Add keys to configuration files
2. Restart backend server
3. Restart frontend server
4. Test payment with test card
5. Check Stripe Dashboard for payment

---

## 📞 Need Help?

### Can't Find API Keys?
1. Make sure you're logged in
2. Look for "Developers" in left sidebar
3. Click "API keys"
4. Toggle "Test mode" ON (top right)

### Keys Not Working?
1. Verify you copied the complete key
2. Check for extra spaces
3. Ensure using test keys (pk_test_ / sk_test_)
4. Try regenerating keys

---

## ✅ Quick Checklist

- [ ] Created Stripe account
- [ ] Verified email
- [ ] Accessed dashboard
- [ ] Found API keys section
- [ ] Copied publishable key (pk_test_...)
- [ ] Copied secret key (sk_test_...)
- [ ] Added to application.properties
- [ ] Created .env file
- [ ] Added to .env file
- [ ] Ready to test!

---

**Once you have your keys, let me know and I'll help you configure them!** 🔑✨
