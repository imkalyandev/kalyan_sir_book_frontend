from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from contextlib import asynccontextmanager
from datetime import datetime

from database import connect_db, close_db
from routes.book_routes import router as book_router
from routes.order_routes import router as order_router
from routes.payment_routes import router as payment_router
from utils.exceptions import (
    http_exception_handler,
    validation_exception_handler,
    general_exception_handler
)
from config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_db()
    yield
    # Shutdown
    await close_db()

app = FastAPI(
    title="Book Store API",
    description="A complete book e-commerce API built with FastAPI",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Exception handlers
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, general_exception_handler)

# CORS Configuration
is_production = settings.NODE_ENV == "production"

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    settings.FRONTEND_URL,
]

if is_production:
    origins.extend([
        "https://*.onrender.com",
        "https://bookstore-frontend.onrender.com"
    ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if is_production else origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(book_router, prefix="/api/books", tags=["Books"])
app.include_router(order_router, prefix="/api/orders", tags=["Orders"])
app.include_router(payment_router, prefix="/api/payment", tags=["Payment"])

# Root route
@app.get("/")
async def root():
    return {
        "message": "Book Store API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "books": "/api/books",
            "orders": "/api/orders",
            "paymentPython FastAPI Server is running",
        "version": "1.0.0",
        "framework": "FastAPI",
        "language": "Python",
        "environment": settings.NODE_ENV,
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    
        "status": "OK",
        "message": "Server is running",
        "environment": os.getenv("NODE_ENV", "development"),
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
