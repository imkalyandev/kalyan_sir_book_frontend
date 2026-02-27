# 🎯 Getting Started - MUST READ FIRST!

## 👋 Welcome!

Your complete Book Selling Website has been built successfully!

---

## 📂 What You Have

### ✅ Complete Full-Stack Application
- **Frontend**: React app with 5 pages + 2 components
- **Backend**: Node.js/Express API with MongoDB
- **Payment**: Razorpay integration
- **Email**: Automated notifications
- **Database**: MongoDB with sample data

### ✅ Documentation
- `QUICK_START.md` - Fast setup (5 minutes)
- `SETUP_GUIDE.md` - Detailed instructions
- `PROJECT_SUMMARY.md` - Complete overview
- `CHECKLIST.md` - Verification checklist
- `README.md` - Project README

### ✅ Helper Scripts (Windows)
- `setup.bat` - Install all dependencies
- `start-dev.bat` - Start both servers
- `seed-database.bat` - Populate database

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies (2 min)

**Option A: Use Script**
```bash
# Double-click setup.bat
# OR in terminal:
setup.bat
```

**Option B: Manual**
```bash
# Install frontend
npm install

# Install backend
cd server
npm install
cd ..
```

### Step 2: Configure Environment (2 min)

Edit `server/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore

# Get from https://razorpay.com (free test account)
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_SECRET=YOUR_SECRET_HERE

# Your Gmail settings
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_app_password_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

**🔑 Getting Credentials:**

1. **Razorpay** (2 min):
   - Visit https://razorpay.com
   - Sign up (free)
   - Go to Settings → API Keys
   - Generate Test keys
   - Copy to .env

2. **Gmail App Password** (2 min):
   - Go to myaccount.google.com
   - Security → 2-Step Verification (enable it)
   - Security → App Passwords
   - Generate password for "Mail"
   - Copy to .env

### Step 3: Start MongoDB (1 min)

**Windows:**
- MongoDB should auto-start as a service
- Check in Services (Win + R → services.msc)

**Mac/Linux:**
```bash
sudo systemctl start mongod
```

**OR use MongoDB Atlas (cloud):**
- Sign up at mongodb.com/atlas
- Create free cluster
- Get connection string
- Update MONGODB_URI in .env

### Step 4: Seed Database (30 sec)

```bash
# Option A: Use script
seed-database.bat

# Option B: Manual
cd server
node seedBooks.js
```

Should see: "✅ Added 6 books to database"

### Step 5: Start Application (30 sec)

**Option A: Use Script (Recommended)**
```bash
# Double-click start-dev.bat
# Opens 2 terminal windows automatically
```

**Option B: Manual (2 terminals needed)**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### Step 6: Open Browser

Visit: **http://localhost:5173**

---

## 🎮 Test the Application

### 1. Home Page
- See author info
- View courses
- Click "Books" button

### 2. Books Page
- Should see 6 programming books
- Each with image, price, description
- Click "Buy Now" on any book

### 3. Checkout
Fill in the form:
- Full Name: `John Doe`
- Address: `123 Main Street, Apartment 4B`
- Pincode: `400001`
- Mobile: `9876543210`
- Email: `test@example.com`
- Click "Continue to Order Summary"

### 4. Order Summary
- Review your order
- See total: Book Price + ₹50 delivery
- Click "Pay Now"

### 5. Payment (Razorpay Test)
Use these TEST credentials:
- **Card Number**: `4111 1111 1111 1111`
- **CVV**: `123`
- **Expiry**: `12/25`
- **Name**: `Test User`

OR

- **UPI ID**: `success@razorpay`

Click "Pay"

### 6. Success Page
- See success animation ✅
- Order ID
- Payment ID
- Delivery date (5-7 days from now)
- Check your email for confirmation!

---

## 📧 Email Testing

After payment, you should receive an email with:
- Order confirmation
- Book details
- Payment info
- Delivery date
- Delivery address

**No email?** Check:
1. Spam folder
2. EMAIL_PASSWORD in .env (use App Password, not regular password)
3. 2-Step Verification enabled in Google
4. Backend console for errors

---

## ✅ Everything Working?

Congratulations! 🎉 You now have a fully functional e-commerce website!

### What You Can Do Now:

1. **Customize Content**
   - Edit `src/pages/Home.jsx` - Update author info
   - Edit `src/components/Footer.jsx` - Update contact details
   - Edit `server/seedBooks.js` - Add your own books

2. **Add More Books**
   - Use POST /api/books endpoint
   - Or add to seedBooks.js and run again

3. **Test Different Scenarios**
   - Failed payment
   - Out of stock books
   - Form validation

4. **Deploy** (See SETUP_GUIDE.md)
   - Frontend → Vercel/Netlify
   - Backend → Render/Railway
   - Database → MongoDB Atlas

---

## 🐛 Common Issues

### "MongoDB connection failed"
**Solution**: Start MongoDB service
```bash
# Windows
services.msc → MongoDB Server → Start

# Mac/Linux
sudo systemctl start mongod
```

### "Cannot GET /api/books"
**Solution**: Backend not running
```bash
cd server
npm run dev
```

### "Network Error" in frontend
**Solution**: Check API_URL in frontend files
- Should be: `http://localhost:5000/api`
- Backend must be running on port 5000

### Razorpay not loading
**Solution**:
1. Check internet connection
2. Verify RAZORPAY_KEY_ID in .env
3. Check browser console for errors

### Email not sending
**Solution**:
1. Use Gmail App Password (not regular password)
2. Enable 2-Step Verification
3. Check EMAIL_USER and EMAIL_PASSWORD in .env

---

## 📚 Learn More

- **Quick Start**: See `QUICK_START.md`
- **Full Setup**: See `SETUP_GUIDE.md`
- **All Features**: See `PROJECT_SUMMARY.md`
- **Verify Setup**: See `CHECKLIST.md`

---

## 📊 Project Stats

- **Total Files Created**: 27
- **Frontend Components**: 7
- **Backend Files**: 15
- **API Endpoints**: 11
- **Database Collections**: 2
- **Documentation Files**: 5

---

## 🎯 Your Application Features

✅ Home page with author bio and courses
✅ Books listing with live API data
✅ Shopping cart functionality
✅ User details form with validation
✅ Order summary with price breakdown
✅ Razorpay payment integration
✅ Payment success page
✅ Email notifications
✅ Order tracking
✅ Stock management
✅ Responsive design
✅ Error handling
✅ Loading states
✅ Clean architecture
✅ Security best practices

---

## 🚀 Ready to Start?

1. Run `setup.bat` (or install manually)
2. Edit `server/.env` with your credentials
3. Run `seed-database.bat`
4. Run `start-dev.bat`
5. Open http://localhost:5173
6. Test a complete purchase!

---

## 💡 Pro Tips

1. **Development**:
   - Keep both terminals running
   - Check console for errors
   - Use browser DevTools

2. **Testing**:
   - Always use Razorpay TEST keys
   - Test card: 4111 1111 1111 1111
   - Check MongoDB after each order

3. **Customization**:
   - Colors: Edit Tailwind classes
   - Books: Modify seedBooks.js
   - Author: Update Home.jsx

---

## 🎓 Next Level

Want to enhance further?

1. **Add Authentication**
   - User login/register
   - Protected routes
   - User dashboard

2. **Admin Panel**
   - Manage books
   - View orders
   - Analytics

3. **More Features**
   - Book search
   - Filters/sorting
   - Reviews
   - Wishlists

See PROJECT_SUMMARY.md for more ideas!

---

## ❤️ Enjoy Your Application!

You now have a professional, production-ready e-commerce website.

**Questions? Check the documentation files!**

**Happy Coding! 🚀**

---

Created: February 27, 2026
