# Quick Reference: Running Python Backend

## 🚀 Start Backend

**Windows (Using batch file):**
```cmd
start-backend-python.bat
```

**Manual Start:**
```bash
cd server
pip install -r requirements.txt
python run.py
```

## 📊 Seed Database

**Windows:**
```cmd
seed-database-python.bat
```

**Manual:**
```bash
cd server
python seed_books.py
```

## 🌐 Access Points

- API: http://localhost:5000
- Interactive Docs: http://localhost:5000/docs
- Alternative Docs: http://localhost:5000/redoc
- Health Check: http://localhost:5000/api/health

## ⚙️ Environment Setup

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

## 📦 Virtual Environment (Recommended)

**Create:**
```bash
cd server
python -m venv venv
```

**Activate:**
```cmd
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

**Install:**
```bash
pip install -r requirements.txt
```

## 🔧 Common Commands

| Task | Command |
|------|---------|
| Install deps | `pip install -r requirements.txt` |
| Run server | `python run.py` |
| Run with uvicorn | `uvicorn main:app --reload` |
| Seed database | `python seed_books.py` |
| Check Python | `python --version` |

## 📚 API Endpoints

### Books
- `GET /api/books` - List all books
- `POST /api/books` - Create book
- `GET /api/books/{id}` - Get book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/{id}` - Get order
- `GET /api/orders?orderId=XXX` - Find by orderId

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `POST /api/payment/failed` - Record failure

## 🐛 Troubleshooting

**Module not found:**
```bash
pip install -r requirements.txt
```

**Port in use:**
```cmd
# Change PORT in .env
PORT=5001
```

**MongoDB error:**
```cmd
# Start MongoDB
mongod
```

## 📖 Documentation

- Full Guide: [server/README_PYTHON.md](server/README_PYTHON.md)
- Migration Info: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- FastAPI Docs: https://fastapi.tiangolo.com

---

**Your backend is now Python FastAPI! 🐍**
