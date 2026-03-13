# Setup Instructions

## Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven
- MongoDB Atlas account
- Stripe account (for payment processing)

## Backend Setup

### 1. Configure Environment Variables

Create a file `smart-parking-backend/src/main/resources/application-local.properties` (this file is gitignored):

```properties
# MongoDB Configuration
spring.data.mongodb.uri=your_mongodb_connection_string

# JWT Configuration
jwt.secret=your_jwt_secret_key

# Stripe Configuration
stripe.api.key=your_stripe_secret_key
stripe.publishable.key=your_stripe_publishable_key
```

### 2. Or Set Environment Variables

Alternatively, set these environment variables:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Your JWT secret key
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key

### 3. Run Backend

```bash
cd smart-parking-backend
mvn spring-boot:run
```

For Windows with Java 24 SSL issues:
```bash
$env:MAVEN_OPTS='-Djavax.net.ssl.trustStoreType=Windows-ROOT'
mvn spring-boot:run
```

## Frontend Setup

### 1. Install Dependencies

```bash
cd smart-parking-frontend
npm install
```

### 2. Configure Environment Variables

Create `.env` file in `smart-parking-frontend/`:

```env
VITE_API_URL=http://localhost:8080/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NODE_ENV=development
```

### 3. Run Frontend

```bash
npm run dev
```

## MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string
6. Update the connection string in your configuration

## Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Go to Developers > API keys
3. Copy your test keys:
   - Secret key (starts with `sk_test_`)
   - Publishable key (starts with `pk_test_`)
4. Add them to your configuration files

## Test Accounts

After the backend starts, these test accounts will be created automatically:

- **User Account:**
  - Email: user@smartparking.com
  - Password: user123

- **Admin Account:**
  - Email: admin@smartparking.com
  - Password: admin123

## Test Cards (Stripe)

Use these test cards for payment testing:
- Success: 4242 4242 4242 4242
- Declined: 4000 0000 0000 0002
- Insufficient Funds: 4000 0000 0000 9995

## Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify Java version (17+)
- Check if port 8080 is available

### Frontend won't start
- Run `npm install` again
- Check if port 3000 is available
- Verify `.env` file exists

### Payment not working
- Verify Stripe keys are correct
- Check browser console for errors
- Ensure backend is running

### QR Scanner not working
- Allow camera permissions in browser
- Use HTTPS or localhost
- Check browser compatibility

## Security Notes

- Never commit `.env` files to git
- Never commit actual API keys to git
- Use environment variables in production
- Rotate keys regularly
- Use Stripe live keys only in production
