# 🚀 Quick Start Guide

## Prerequisites
✅ Node.js installed
✅ MongoDB installed or MongoDB Atlas account
✅ Razorpay account (for payments)

## Setup Steps

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 2. Configure Environment

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
RAZORPAY_KEY_ID=your_test_key
RAZORPAY_SECRET=your_test_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 3. Seed Database

```bash
cd server
node seedBooks.js
```

### 4. Run Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🧪 Test Payment

Use Razorpay test credentials:
- Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

---

## 📂 Project Structure

```
book/
├── src/
│   ├── components/     # Navbar, Footer
│   ├── pages/          # Home, Books, Checkout, etc.
│   └── App.jsx
├── server/
│   ├── controllers/    # Business logic
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── utils/          # Email service
│   └── server.js       # Main server
└── package.json
```

## ✅ Features Implemented

- ✅ Home page with author bio
- ✅ Books listing with API integration
- ✅ User details form with validation
- ✅ Order summary page
- ✅ Razorpay payment integration
- ✅ Payment success page
- ✅ Email notifications
- ✅ Order tracking
- ✅ MongoDB database
- ✅ RESTful API
- ✅ Responsive design

## 🎯 User Flow

1. User visits Home page
2. Clicks "Books" → sees all books
3. Clicks "Buy Now" on a book
4. Fills user details form
5. Reviews order summary
6. Clicks "Pay Now" → Razorpay opens
7. Completes payment
8. Sees success page with order details
9. Receives confirmation email

---

For detailed documentation, see SETUP_GUIDE.md
