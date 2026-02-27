# ✅ Setup Checklist

Use this checklist to ensure everything is properly configured.

---

## 📋 Pre-Installation

- [ ] Node.js (v16+) installed
  - Verify: `node --version`
  
- [ ] npm installed
  - Verify: `npm --version`
  
- [ ] MongoDB installed OR MongoDB Atlas account ready
  - Local: `mongod --version`
  - Atlas: Have connection string ready
  
- [ ] Razorpay account created
  - Go to: https://razorpay.com
  - Get Test API keys
  
- [ ] Gmail account for emails
  - Enable 2-Step Verification
  - Generate App Password

---

## 📦 Installation

- [ ] Frontend dependencies installed
  ```bash
  npm install
  ```
  
- [ ] Backend dependencies installed
  ```bash
  cd server
  npm install
  ```

---

## ⚙️ Configuration

- [ ] Created `server/.env` file
  
- [ ] Configured `PORT=5000`
  
- [ ] Configured `MONGODB_URI`
  - Local: `mongodb://localhost:27017/bookstore`
  - Atlas: Your connection string
  
- [ ] Added `RAZORPAY_KEY_ID` (from Razorpay dashboard)
  
- [ ] Added `RAZORPAY_SECRET` (from Razorpay dashboard)
  
- [ ] Configured `EMAIL_USER` (your Gmail)
  
- [ ] Configured `EMAIL_PASSWORD` (Gmail App Password)
  
- [ ] Other email settings configured:
  - `EMAIL_HOST=smtp.gmail.com`
  - `EMAIL_PORT=587`

---

## 🗄️ Database Setup

- [ ] MongoDB service is running
  - Windows: Check Services
  - Mac/Linux: `sudo systemctl status mongod`
  
- [ ] Database seeded with sample books
  ```bash
  cd server
  node seedBooks.js
  ```
  
- [ ] Verify books added (should show 6 books)

---

## 🚀 Running the Application

- [ ] Backend server starts successfully
  ```bash
  cd server
  npm run dev
  ```
  - Should show: "Server running on port 5000"
  - Should show: "MongoDB Connected"
  
- [ ] Frontend server starts successfully
  ```bash
  npm run dev
  ```
  - Should show Vite dev server URL
  
- [ ] Can access frontend at http://localhost:5173
  
- [ ] Can access backend at http://localhost:5000/api/health
  
- [ ] No console errors in browser

---

## 🧪 Testing Features

### Home Page
- [ ] Home page loads correctly
- [ ] Navigation bar appears
- [ ] Author section displays
- [ ] Course cards show
- [ ] Footer appears
- [ ] "Books" button works

### Books Page
- [ ] Books page loads
- [ ] Books fetched from API
- [ ] 6 sample books display
- [ ] Book images load
- [ ] Prices show correctly
- [ ] "Buy Now" buttons work
- [ ] Stock count displays

### Checkout Flow
- [ ] Clicking "Buy Now" navigates to checkout
- [ ] Book details show in sidebar
- [ ] Form fields present:
  - [ ] Full Name
  - [ ] Address
  - [ ] Pincode
  - [ ] Mobile Number
  - [ ] Email
  
- [ ] Form validation works:
  - [ ] Empty field shows error
  - [ ] Invalid email shows error
  - [ ] Invalid pincode shows error
  - [ ] Invalid mobile shows error
  
- [ ] Submit creates order successfully
- [ ] Navigates to order summary

### Order Summary
- [ ] Order ID displays
- [ ] Book details show
- [ ] User details display
- [ ] Price breakdown shows:
  - [ ] Book price
  - [ ] Delivery charges (₹50)
  - [ ] Total amount
- [ ] "Back" button works
- [ ] "Pay Now" button clickable

### Payment Integration
- [ ] Clicking "Pay Now" loads Razorpay
- [ ] Razorpay checkout modal opens
- [ ] Can see order amount
- [ ] Can select payment method
- [ ] Test payment works:
  - Card: 4111 1111 1111 1111
  - CVV: 123
  - Expiry: 12/25
  
- [ ] Payment success redirects correctly
- [ ] Success page shows:
  - [ ] Success message
  - [ ] Order ID
  - [ ] Payment ID
  - [ ] Book name
  - [ ] Total amount
  - [ ] Delivery date
  
- [ ] Order status updated to "Paid" in database

### Email Notification
- [ ] Confirmation email received
- [ ] Email contains:
  - [ ] Order ID
  - [ ] Book title
  - [ ] Amount details
  - [ ] Delivery date
  - [ ] Delivery address

---

## 🔍 Database Verification

Check in MongoDB:

- [ ] Books collection exists
- [ ] 6 books in collection
- [ ] Orders collection exists
- [ ] Test order created
- [ ] Order has payment status "Paid"
- [ ] Book stock reduced by 1

---

## 🌐 API Testing

Test these endpoints (use Postman or browser):

- [ ] GET http://localhost:5000/api/health
  - Should return: `{"status": "OK"}`
  
- [ ] GET http://localhost:5000/api/books
  - Should return: Array of 6 books
  
- [ ] GET http://localhost:5000/api/books/:id
  - Should return: Single book details

---

## 🎨 UI/UX Checks

- [ ] Responsive design works
  - [ ] Desktop view
  - [ ] Tablet view
  - [ ] Mobile view
  
- [ ] Loading states show
- [ ] Error messages display
- [ ] Buttons have hover effects
- [ ] Navigation works smoothly
- [ ] Images load properly
- [ ] Typography is readable
- [ ] Colors are consistent

---

## 🔒 Security Checks

- [ ] .env file not committed to git
- [ ] API keys not exposed in frontend
- [ ] CORS configured correctly
- [ ] Payment signature verified
- [ ] Input validation working
- [ ] Error handling in place

---

## 📝 Documentation

- [ ] README.md exists
- [ ] SETUP_GUIDE.md exists
- [ ] QUICK_START.md exists
- [ ] PROJECT_SUMMARY.md exists
- [ ] Setup scripts created (.bat files)

---

## ✨ Final Checks

- [ ] No errors in backend console
- [ ] No errors in frontend console
- [ ] No errors in browser console
- [ ] Complete user flow works (Home → Books → Checkout → Payment → Success)
- [ ] Email notification received
- [ ] Database updated correctly

---

## 🎯 If Everything Passes

**Congratulations! 🎉**

Your Book Selling Website is fully functional and ready to use!

### Optional Next Steps:
1. Customize author information
2. Add more books manually
3. Update styling/branding
4. Deploy to production
5. Add authentication
6. Build admin panel

---

## ❌ Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify firewall settings

### Razorpay Not Loading
- Check internet connection
- Verify Razorpay keys in .env
- Use test mode keys for development

### Email Not Sending
- Verify Gmail App Password
- Check 2-Step Verification enabled
- Test SMTP credentials

### CORS Error
- Ensure backend runs on port 5000
- Check CORS configuration in server.js
- Verify API_URL in frontend files

### Books Not Displaying
- Run seed script again
- Check MongoDB connection
- Verify API endpoint

---

**Need Help?**

Check these files:
- SETUP_GUIDE.md - Detailed setup
- QUICK_START.md - Quick reference
- PROJECT_SUMMARY.md - Complete overview

---

Last Updated: February 27, 2026
