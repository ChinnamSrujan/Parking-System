# 📱 QR Code Scanner Feature Guide

## Overview

The Smart Parking System now includes an **inbuilt QR code scanner** that allows security personnel or parking attendants to verify bookings by scanning QR codes.

---

## ✨ Features

- **Real-time QR Code Scanning** using device camera
- **Instant Verification** of booking validity
- **Visual Feedback** with success/error messages
- **Booking Details Display** after successful scan
- **Access Control** - Shows "Verified! You can park the vehicle in the slot"

---

## 🚀 How to Use

### For Users (Getting QR Code):

1. **Make a Booking:**
   - Login to the system
   - Search for parking
   - Book a slot
   - Complete payment

2. **Get Your QR Code:**
   - Go to "My Bookings"
   - Your QR code is displayed with each booking
   - This QR code contains your booking ID

### For Security/Attendants (Scanning QR Code):

1. **Access Scanner:**
   - Login to the system (User or Admin account)
   - Click "Scan QR" in the navigation bar
   - Or navigate to: http://localhost:3000/verify-qr

2. **Scan QR Code:**
   - Click "Open QR Scanner" button
   - Allow camera access when prompted
   - Point camera at the QR code
   - Hold steady until scan completes

3. **View Result:**
   - **✅ Valid Booking:** Green screen with "Verified! You can park the vehicle in the slot"
   - **❌ Invalid:** Red screen with "Access Denied"

---

## 📋 Verification Results

### ✅ Successful Verification

When a valid QR code is scanned, you'll see:

```
✓ Verified!
You can park the vehicle in the slot

Booking Details:
- Booking ID: xxx
- Slot ID: A15
- Status: ACTIVE
- Start Time: [timestamp]
- End Time: [timestamp]

✓ Access Granted
Please proceed to your assigned parking slot
```

### ❌ Failed Verification

When an invalid QR code is scanned:

```
✗ Invalid QR Code
Booking not found or expired

✗ Access Denied
Please contact support or make a new booking
```

---

## 🎯 Use Cases

### 1. Entry Gate Verification
- Security scans QR code at parking entrance
- System verifies booking is active
- Grants or denies access

### 2. Parking Attendant Check
- Attendant verifies vehicles in parking lot
- Ensures only authorized vehicles are parked
- Quick verification without manual lookup

### 3. Exit Verification
- Scan QR code when leaving
- Verify booking time hasn't expired
- Process exit

---

## 🔧 Technical Details

### Frontend Components

**QRScanner.jsx**
- Uses `html5-qrcode` library
- Accesses device camera
- Scans QR codes in real-time
- Returns decoded booking ID

**VerificationResult.jsx**
- Displays verification result
- Shows booking details
- Provides visual feedback (green/red)

**QRVerification.jsx**
- Main page for QR scanning
- Handles scan workflow
- Calls backend API for verification

### Backend API

**Endpoint:** `GET /api/bookings/{bookingId}`

**Response:**
```json
{
  "id": "booking123",
  "userId": "user456",
  "slotId": "A15",
  "status": "ACTIVE",
  "bookingStartTime": "2024-03-10T10:00:00",
  "bookingEndTime": "2024-03-10T12:00:00",
  "qrCode": "base64_encoded_image",
  "createdAt": "2024-03-10T09:45:00"
}
```

---

## 📱 Camera Permissions

### Browser Permissions Required:
- **Camera Access:** Required for QR scanning
- **HTTPS:** Camera access requires HTTPS in production
- **Local Development:** Works on localhost without HTTPS

### Granting Permissions:

**Chrome/Edge:**
1. Click camera icon in address bar
2. Select "Allow"
3. Refresh page if needed

**Firefox:**
1. Click camera icon in address bar
2. Select "Allow"
3. Remember decision

**Safari:**
1. Safari → Preferences → Websites → Camera
2. Allow for localhost

---

## 🎨 UI/UX Features

### Scanner Interface:
- Clean, modern design
- Clear instructions
- Visual QR code frame
- Cancel button to close

### Verification Screen:
- Large success/error icons
- Color-coded feedback (green/red)
- Detailed booking information
- Clear action messages

### Navigation:
- "Scan QR" button in navbar
- Accessible to both users and admins
- Icon for easy identification

---

## 🔒 Security Features

1. **Authentication Required:**
   - Must be logged in to access scanner
   - JWT token validation

2. **Booking Validation:**
   - Checks booking exists
   - Verifies status is ACTIVE
   - Ensures booking hasn't expired

3. **Real-time Verification:**
   - Instant backend validation
   - No cached data
   - Always current status

---

## 🚀 Testing the Feature

### Test Steps:

1. **Create a Test Booking:**
   ```
   - Login as: user@smartparking.com / user123
   - Go to "Search Parking"
   - Book any available slot
   - Complete payment
   ```

2. **View QR Code:**
   ```
   - Go to "My Bookings"
   - See your booking with QR code
   - QR code is displayed as an image
   ```

3. **Scan QR Code:**
   ```
   - Click "Scan QR" in navbar
   - Click "Open QR Scanner"
   - Allow camera access
   - Point camera at QR code on screen
   - View verification result
   ```

### Alternative Testing (Without Camera):

If you don't have a camera or want to test quickly:

1. Get booking ID from "My Bookings"
2. Manually call API:
   ```bash
   curl http://localhost:8080/api/bookings/{bookingId} \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

---

## 📊 Status Indicators

| Status | Color | Icon | Message |
|--------|-------|------|---------|
| ACTIVE | Green | ✓ | Verified! You can park |
| COMPLETED | Blue | ℹ | Booking completed |
| CANCELLED | Red | ✗ | Booking cancelled |
| NOT FOUND | Red | ✗ | Invalid QR code |

---

## 🛠️ Troubleshooting

### Camera Not Working:
- Check browser permissions
- Ensure camera is not used by another app
- Try different browser
- Check if camera is physically blocked

### QR Code Not Scanning:
- Ensure good lighting
- Hold camera steady
- Move closer/farther from QR code
- Clean camera lens
- Try different angle

### Verification Fails:
- Check internet connection
- Verify backend is running
- Ensure booking is ACTIVE
- Check booking hasn't expired

### "Access Denied" Error:
- Booking may be cancelled
- Booking may have expired
- QR code may be invalid
- Contact support

---

## 🎯 Best Practices

### For Security Personnel:
1. Always verify the verification screen
2. Check booking details match vehicle
3. Note the slot number
4. Guide driver to correct slot
5. Report any issues immediately

### For Users:
1. Keep QR code accessible
2. Don't share QR code
3. Have QR code ready before arrival
4. Ensure phone screen is bright
5. Arrive within booking time

---

## 📈 Future Enhancements

Potential improvements:
- [ ] Offline QR code validation
- [ ] Multiple QR code formats
- [ ] Scan history logging
- [ ] Analytics dashboard for scans
- [ ] Automatic gate opening integration
- [ ] SMS notification on scan
- [ ] Photo capture on verification
- [ ] License plate recognition

---

## 🔗 Related Documentation

- **API_DOCUMENTATION.md** - API endpoints
- **TESTING.md** - Testing procedures
- **PROJECT_STATUS.md** - System status
- **FEATURES.md** - All features

---

## 📞 Support

If you encounter issues:
1. Check this guide
2. Review browser console for errors
3. Check backend logs
4. Verify camera permissions
5. Test with different QR code

---

## ✅ Quick Reference

**Access Scanner:** http://localhost:3000/verify-qr

**Test Credentials:**
- User: user@smartparking.com / user123
- Admin: admin@smartparking.com / admin123

**Success Message:**
"Verified! You can park the vehicle in the slot"

**Required:** Camera access, Active booking, Internet connection
