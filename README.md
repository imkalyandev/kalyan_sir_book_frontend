# 📚 Book Selling Website

A modern, full-stack book e-commerce platform with **Python FastAPI** backend, React frontend, secure payments, and email notifications.

## 🚀 Technology Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client

### Backend (Python FastAPI) 🐍
- **FastAPI** - High-performance async web framework
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation & settings
- **Uvicorn** - ASGI server
- **Razorpay SDK** - Payment integration
- **aiosmtplib** - Async email service
**Note**: Backend is 100% Python - No JavaScript files! ✅
### Database & Services
- **MongoDB** - NoSQL database
- **Razorpay** - Payment gateway
- **Gmail SMTP** - Email notifications

---

## 🏃‍♂️ Quick Start

### Prerequisites
- **Python 3.11+** ([Download](https://www.python.org/downloads/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community))

### 1. Clone & Install

**Windows (Easy Way):**
```cmd
setup-all-python.bat
```

**Manual:**
```bash
# Backend
cd server
pip install -r requirements.txt

# Frontend
cd ..
npm install
```

### 2. Environment Setup

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bookstore
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 3. Seed Database

**Windows:**
```cmd
seed-database-python.bat
```

**Manual:**
```bash
cd server
python seed_books.py
```

### 4. Run Application

**Windows (Easy Way):**
```cmd
# Terminal 1: Backend
start-backend-python.bat

# Terminal 2: Frontend
npm run dev
```

**Manual:**
```bash
# Terminal 1: Backend
cd server
python run.py

# Terminal 2: Frontend
npm run dev
```

### 5. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Docs (Swagger)**: http://localhost:5000/docs 🎉
- **Alternative Docs**: http://localhost:5000/redoc

---

## ✨ Features

### 🏠 Home Page
- Author bio and introduction
- Featured courses section with hover effects
- Responsive design

### 📚 Books Page
- Dynamic book listing from database
- Real-time stock tracking
- Add to cart functionality
- Book details (title, author, price)

### 🛒 Checkout Flow
1. **User Details Form**
   - Full name, address, pincode
   - Mobile number and email
   - Real-time validation

2. **Order Summary**
   - Order review
   - Price breakdown
   - Razorpay payment integration

3. **Payment Success**
   - Order confirmation
   - Delivery date (5-7 days)
   - Email notification sent

### 💳 Payment Integration
- **Razorpay** integration
- Signature verification
- Payment status tracking
- Automatic stock reduction

### 📧 Email Notifications
- Order confirmation emails
- Order details and tracking
- Delivery information
- Professional HTML templates

---

## 📁 Project Structure

```
book-selling-website/
├── src/                          # Frontend React app
│   ├── App.jsx                   # Main router
│   ├── main.jsx                 # Entry point
│   ├── config.js                # API configuration
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── pages/
│       ├── Home.jsx
│       ├── Books.jsx
│       ├── Checkout.jsx
│       ├── OrderSummary.jsx
│       └── PaymentSuccess.jsx
│
├── server/                       # Backend Python FastAPI
│   ├── main.py                  # FastAPI application
│   ├── database.py              # MongoDB connection
│   ├── requirements.txt         # Python dependencies
│   ├── run.py                   # Development server
│   ├── seed_books.py           # Database seeder
│   ├── models/                  # Pydantic models
│   │   ├── book.py
│   │   └── order.py
│   ├── routes/                  # API routes
│   │   ├── book_routes.py
│   │   ├── order_routes.py
│   │   └── payment_routes.py
│   ├── controllers/             # Business logic
│   │   ├── book_controller.py
│   │   ├── order_controller.py
│   │   └── payment_controller.py
│   └── utils/
│       └── email_service.py
│
├── public/                      # Static assets
├── render.yaml                  # Render deployment
├── .github/workflows/
│   └── deploy.yml              # CI/CD pipeline
└── Documentation files
```

---

## 🔌 API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders?orderId=XXX` - Get order by orderId

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment signature
- `POST /api/payment/failed` - Record payment failure

### System
- `GET /` - API information
- `GET /api/health` - Health check
- `GET /docs` - Interactive API docs (Swagger UI)
- `GET /redoc` - Alternative API docs

---

## 🗄️ Database Schema

### Books Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  image: String,
  stock: Number,
  author: String,
  created_at: Date,
  updated_at: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  bookId: ObjectId,
  userDetails: {
    fullName: String,
    address: String,
    pincode: String,
    mobile: String,
    email: String
  },
  orderId: String,
  razorpayOrderId: String,
  paymentId: String,
  paymentSignature: String,
  amount: Number,
  deliveryCharges: Number,
  totalAmount: Number,
  paymentStatus: String,
  deliveryDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment

### Deploy to Render

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Configure Render**
   - The project includes `render.yaml` for automatic deployment
   - Configure environment variables in Render dashboard
   - Auto-deploys on push to main branch

3. **Set Environment Variables**
   - MongoDB Atlas connection string
   - Razorpay API credentials (live keys)
   - Email SMTP credentials
   - Frontend URL for CORS

**Detailed guides:**
- [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) - Complete deployment guide
- [DEPLOY_QUICK.md](DEPLOY_QUICK.md) - 10-minute quickstart
- [CI_CD_PIPELINE.md](CI_CD_PIPELINE.md) - Pipeline architecture

---

## 📚 Documentation

- **[PYTHON_QUICKSTART.md](PYTHON_QUICKSTART.md)** - Quick reference for Python backend
- **[MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)** - Node.js to Python migration details
- **[server/README_PYTHON.md](server/README_PYTHON.md)** - Detailed Python backend guide
- **[RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)** - Deployment guide
- **[CI_CD_PIPELINE.md](CI_CD_PIPELINE.md)** - CI/CD workflow

---

## 🐛 Troubleshooting

### Backend Issues

**Module not found:**
```bash
cd server
pip install -r requirements.txt
```

**Port already in use:**
```env
# Change PORT in server/.env
PORT=5001
```

**MongoDB connection error:**
```bash
# Make sure MongoDB is running
mongod
```

### Frontend Issues

**Dependencies error:**
```bash
npm install
```

**API connection failed:**
- Check if backend is running on port 5000
- Verify API_URL in src/config.js

---

## 🎓 Learning Resources

### Python FastAPI
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Motor Docs**: https://motor.readthedocs.io
- **Pydantic**: https://docs.pydantic.dev

### Frontend
- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com

### Payments
- **Razorpay Docs**: https://razorpay.com/docs/

---

## ✅ Why Python FastAPI?

- ✅ **Fast**: High performance, on par with Node.js
- ✅ **Easy**: Simple, clean syntax
- ✅ **Auto Docs**: Swagger UI generated automatically
- ✅ **Type Safe**: Python type hints + Pydantic
- ✅ **Async**: Native async/await support
- ✅ **Modern**: Based on standards (OpenAPI, JSON Schema)
- ✅ **Production Ready**: Used by Netflix, Uber, Microsoft

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🎉 Getting Started Checklist

- [ ] Python 3.11+ installed
- [ ] Node.js 18+ installed
- [ ] MongoDB installed and running
- [ ] Created server/.env file
- [ ] Backend dependencies installed (`pip install -r requirements.txt`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Database seeded (`python server/seed_books.py`)
- [ ] Backend running (`python server/run.py`)
- [ ] Frontend running (`npm run dev`)
- [ ] Tested payment flow with Razorpay test keys

---

**Built with ❤️ using Python FastAPI, React, and MongoDB**

For questions or support, check the documentation files or visit http://localhost:5000/docs for interactive API documentation!

