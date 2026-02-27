# Python FastAPI Backend

This is a **pure Python FastAPI** backend with no JavaScript files.

## 🐍 Pure Python Stack

- **FastAPI** - Modern web framework
- **Motor** - Async MongoDB driver  
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **Razorpay** - Payment integration
- **aiosmtplib** - Email service

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bookstore
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASSWORD=your_password
```

### 3. Seed Database

```bash
python seed_books.py
```

### 4. Run Server

**Option 1: Using run.py**
```bash
python run.py
```

**Option 2: Using uvicorn directly**
```bash
uvicorn main:app --reload --port 5000
```

### 5. Access API

- **API**: http://localhost:5000
- **Interactive Docs**: http://localhost:5000/docs
- **Alternative Docs**: http://localhost:5000/redoc
- **Health Check**: http://localhost:5000/api/health

---

## 📁 Structure

```
server/
├── main.py                 # FastAPI app entry point
├── database.py            # MongoDB connection
├── requirements.txt       # Python dependencies
├── run.py                # Development server
├── seed_books.py         # Database seeder
├── .env                  # Environment variables
├── models/               # Pydantic models
│   ├── book.py
│   └── order.py
├── routes/               # API routes
│   ├── book_routes.py
│   ├── order_routes.py
│   └── payment_routes.py
├── controllers/          # Business logic
│   ├── book_controller.py
│   ├── order_controller.py
│   └── payment_controller.py
└── utils/               # Utilities
    └── email_service.py
```

---

## 🔌 API Endpoints

### Books
- `GET /api/books` - List all books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders?orderId=XXX` - Get by orderId

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `POST /api/payment/failed` - Record failure

---

## 🧪 Interactive API Testing

Visit http://localhost:5000/docs to:
- Test all endpoints in browser
- See request/response schemas
- Try different payloads
- No Postman needed!

---

## 🐛 Common Issues

**Module not found:**
```bash
pip install -r requirements.txt
```

**Port in use:**
```bash
# Change PORT in .env
PORT=5001
```

**MongoDB error:**
```bash
# Start MongoDB
mongod
```

---

## 🚀 Production

```bash
# Install dependencies
pip install -r requirements.txt

# Run with multiple workers
uvicorn main:app --host 0.0.0.0 --port $PORT --workers 4
```

---

## 📚 Documentation

- FastAPI: https://fastapi.tiangolo.com
- Motor: https://motor.readthedocs.io
- Pydantic: https://docs.pydantic.dev

---

**100% Python - No JavaScript! 🐍**
