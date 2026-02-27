# 📚 Book Selling Website

A full-stack book selling website with Razorpay payment integration, built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Frontend
- **Home Page**: Author bio, achievements, featured courses
- **Books Page**: Display all available books with filtering
- **Checkout Flow**: User details form with validation
- **Order Summary**: Review order before payment
- **Payment Integration**: Razorpay payment gateway
- **Payment Success**: Order confirmation with delivery details
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

### Backend
- **RESTful API**: Express.js server with clean architecture
- **Database**: MongoDB with Mongoose ODM
- **Payment Gateway**: Razorpay integration
- **Email Notifications**: Order confirmation emails
- **Order Management**: Track orders and payment status

## 🛠️ Tech Stack

**Frontend:**
- React 19
- React Router DOM
- Axios
- Tailwind CSS
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Razorpay SDK
- Nodemailer

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- MongoDB (local or remote instance)
- Razorpay account (for payment integration)
- Gmail account (for sending emails)

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
cd c:\book
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install
```

### 3. Backend Setup

```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install
```

### 4. Environment Configuration

#### Backend Environment (.env)

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**Getting Razorpay Credentials:**
1. Sign up at [https://razorpay.com](https://razorpay.com)
2. Go to Settings → API Keys
3. Generate Test/Live keys
4. Copy Key ID and Secret to .env file

**Gmail App Password:**
1. Enable 2-Step Verification in your Google account
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Use this password in EMAIL_PASSWORD

### 5. Database Setup

#### Start MongoDB

```bash
# On Windows (if MongoDB is installed)
mongod

# Or use MongoDB Atlas (cloud database)
# Update MONGODB_URI in .env with Atlas connection string
```

#### Seed Sample Books

```bash
# In server directory
node seedBooks.js
```

This will populate your database with sample books.

## 🚀 Running the Application

### Start Backend Server

```bash
# In server directory
npm run dev
# Server runs on http://localhost:5000
```

### Start Frontend Application

```bash
# In root directory
npm run dev
# Frontend runs on http://localhost:5173
```

## 📁 Project Structure

```
book/
├── public/              # Static files
├── server/             # Backend
│   ├── controllers/    # Route controllers
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   ├── server.js      # Main server file
│   ├── seedBooks.js   # Database seeder
│   └── .env           # Environment variables
├── src/               # Frontend
│   ├── components/    # Reusable components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/         # Page components
│   │   ├── Home.jsx
│   │   ├── Books.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderSummary.jsx
│   │   └── PaymentSuccess.jsx
│   ├── App.jsx        # Main App component
│   └── main.jsx       # Entry point
└── package.json       # Dependencies
```

## 🔑 API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create book (Admin)
- `PUT /api/books/:id` - Update book (Admin)
- `DELETE /api/books/:id` - Delete book (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `POST /api/payment/failed` - Record payment failure

## 🎨 Using the Application

1. **Browse Books**: Navigate to Books page to see all available books
2. **Select Book**: Click "Buy Now" on any book
3. **Enter Details**: Fill in your delivery information
4. **Review Order**: Check order summary and pricing
5. **Make Payment**: Click "Pay Now" to open Razorpay
6. **Confirmation**: Receive order confirmation and delivery date

## 🧪 Testing Payment

For testing, use Razorpay test credentials:

**Test Card:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Test UPI:**
- UPI ID: `success@razorpay`

## 📧 Email Notifications

After successful payment, customers receive:
- Order confirmation email
- Order ID and payment details
- Expected delivery date
- Delivery address

## 🔒 Security Features

- Input validation on all forms
- Payment signature verification
- CORS enabled for API security
- Environment variables for sensitive data
- Mongoose schema validation

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file

**Razorpay Not Loading:**
- Check Razorpay credentials in .env
- Ensure internet connection is active

**Email Not Sending:**
- Verify Gmail app password
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Ensure 2-Step Verification is enabled

**CORS Error:**
- Make sure backend is running on port 5000
- Check API_URL in frontend files

## 📝 Future Enhancements

- [ ] User authentication and login
- [ ] Admin dashboard for managing books
- [ ] Order tracking system
- [ ] Wishlist functionality
- [ ] Book reviews and ratings
- [ ] Multiple payment methods
- [ ] Discount coupons
- [ ] SMS notifications

## 👨‍💻 Author

Your Name - Author's Bookstore

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Happy Coding! 🚀**
