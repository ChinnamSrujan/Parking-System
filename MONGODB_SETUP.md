# MongoDB Atlas Setup Guide

## Current Issue

The backend is failing to connect to MongoDB Atlas with authentication error:
```
Command failed with error 8000 (AtlasError): 'bad auth : authentication failed'
```

## Possible Causes

1. **Incorrect Password**: The password might be different from `Srujan@2005`
2. **User Not Created**: The database user `chinnamsrujan123` might not exist
3. **Wrong Database Permissions**: User might not have read/write access
4. **IP Whitelist**: Your IP address might not be whitelisted

## Steps to Fix

### 1. Verify MongoDB Atlas User

1. Go to https://cloud.mongodb.com
2. Login to your account
3. Select your project
4. Click "Database Access" in the left sidebar
5. Check if user `chinnamsrujan123` exists
6. If not, create a new user:
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `chinnamsrujan123`
   - Password: `Srujan@2005` (or your preferred password)
   - Database User Privileges: "Atlas admin" or "Read and write to any database"
   - Click "Add User"

### 2. Whitelist Your IP Address

1. In MongoDB Atlas, click "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Either:
   - Click "Add Current IP Address" (recommended for development)
   - Or click "Allow Access from Anywhere" (0.0.0.0/0) for testing
4. Click "Confirm"

### 3. Get Correct Connection String

1. In MongoDB Atlas, click "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It should look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.8o30m.mongodb.net/?retryWrites=true&w=majority
   ```

### 4. Update Application Properties

Once you have the correct password, update the connection string in:
`smart-parking-backend/src/main/resources/application.properties`

**Important**: If your password contains special characters, they must be URL-encoded:
- `@` becomes `%40`
- `:` becomes `%3A`
- `/` becomes `%2F`
- `?` becomes `%3F`
- `#` becomes `%23`
- `[` becomes `%5B`
- `]` becomes `%5D`
- `%` becomes `%25`

Example:
- Password: `Srujan@2005` 
- Encoded: `Srujan%402005`

### 5. Current Configuration

The application is currently configured with:
```
mongodb+srv://chinnamsrujan123:Srujan%402005@cluster0.8o30m.mongodb.net/smartparking
```

## Quick Test

To test if your MongoDB connection works, you can use MongoDB Compass:

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Use this connection string (replace with your actual password):
   ```
   mongodb+srv://chinnamsrujan123:YOUR_PASSWORD@cluster0.8o30m.mongodb.net/
   ```
3. If it connects successfully, the credentials are correct

## Alternative: Create New User

If you're unsure about the password, create a new database user:

1. In MongoDB Atlas → Database Access
2. Delete old user (if exists)
3. Create new user:
   - Username: `smartparking`
   - Password: `SmartParking2024!` (simple password without special chars)
   - Privileges: "Read and write to any database"

4. Update application.properties:
   ```
   spring.data.mongodb.uri=mongodb+srv://smartparking:SmartParking2024!@cluster0.8o30m.mongodb.net/smartparking?retryWrites=true&w=majority
   ```

## Need Help?

Please verify:
1. ✅ MongoDB Atlas account is active
2. ✅ Database user exists with correct username
3. ✅ Password is correct
4. ✅ IP address is whitelisted
5. ✅ User has proper permissions

Once you've verified these, please provide:
- The correct password (I'll encode it properly)
- Or confirm you've created a new user with a simple password
