# 🐍 Python FastAPI Backend

This is the Python FastAPI version of the Book Store backend.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
pip install -r requirements.txt
```

### 2. Setup Environment

Create `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bookstore
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASSWORD=your_app_password
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

**Option 3: Using the main.py**
```bash
python main.py
```

### 5. Access API

- **API Base**: http://localhost:5000
- **Interactive Docs**: http://localhost:5000/docs
- **Alternative Docs**: http://localhost:5000/redoc
- **Health Check**: http://localhost:5000/api/health

---

## 📁 Project Structure

```
server/
├── main.py                 # FastAPI application entry point
├── database.py            # MongoDB connection
├── requirements.txt       # Python dependencies
├── run.py                # Development server runner
├── seed_books.py         # Database seeder
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

## 🔧 Key Technologies

- **FastAPI**: Modern, fast web framework
- **Motor**: Async MongoDB driver
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server
- **Razorpay**: Payment integration
- **aiosmtplib**: Async email sending

---

## 📚 API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders?orderId=XXX` - Get order by orderId

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `POST /api/payment/failed` - Record failure

---

## 🧪 Interactive API Documentation

FastAPI automatically generates interactive API documentation:

1. **Swagger UI**: Visit http://localhost:5000/docs
   - Test all endpoints directly from browser
   - See request/response schemas
   - Try out API calls

2. **ReDoc**: Visit http://localhost:5000/redoc
   - Alternative documentation view
   - Better for reading/exploring

---

## 🔄 Migration from Node.js

### What Changed?

**From Node.js/Express:**
- `server.js` → `main.py`
- `package.json` → `requirements.txt`
- JavaScript → Python
- Callbacks → Async/Await
- Mongoose → Motor (async MongoDB)
- `npm install` → `pip install`
- `npm start` → `uvicorn main:app`

**Unchanged:**
- Database schema (MongoDB)
- API endpoints
- Frontend (works as-is)
- Environment variables
- Business logic

---

## 🐛 Troubleshooting

### Import Errors
```bash
# Make sure you're in server directory
cd server

# Install all dependencies
pip install -r requirements.txt
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Verify MONGODB_URI in .env
```

### Port Already In Use
```bash
# Change port in .env
PORT=5001

# Or kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5000 | xargs kill -9
```

---

## 🚀 Production Deployment

### Using Render (recommended)

The `render.yaml` is already configured for Python FastAPI.

Just push to GitHub and Render will:
1. Detect Python environment
2. Install dependencies from requirements.txt
3. Run: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Manual Deployment

```bash
# Install dependencies
pip install -r requirements.txt

# Run with production settings
uvicorn main:app --host 0.0.0.0 --port 5000 --workers 4
```

---

## ✅ Development Workflow

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Activate virtual environment** (optional but recommended)
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run server**
   ```bash
   python run.py
   ```

5. **Test API**
   - Visit http://localhost:5000/docs
   - Or use frontend at http://localhost:5173

---

## 📦 Python Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Deactivate when done
deactivate
```

---

## 🎓 Learning Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Motor Docs**: https://motor.readthedocs.io
- **Pydantic Docs**: https://docs.pydantic.dev
- **Uvicorn Docs**: https://www.uvicorn.org

---

## ⚡ Why FastAPI?

- ✅ **Fast**: High performance, on par with NodeJS
- ✅ **Easy**: Simple syntax, built-in validation
- ✅ **Auto Docs**: Swagger UI generated automatically
- ✅ **Type Safety**: Python type hints + Pydantic
- ✅ **Async**: Native async/await support
- ✅ **Modern**: Based on standards (OpenAPI, JSON Schema)

---

## 📝 Notes

- Frontend remains unchanged (React app)
- Same MongoDB database structure
- Same API endpoints and responses
- Same environment variables
- Compatible with existing deployment

---

Happy Coding with Python! 🐍🚀
