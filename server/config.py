"""
Configuration settings for the FastAPI application
"""
import os
from typing import Optional
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    """Application settings"""
    
    # Server settings
    PORT: int = int(os.getenv("PORT", 5000))
    HOST: str = "0.0.0.0"
    DEBUG: bool = os.getenv("NODE_ENV") != "production"
    
    # Database settings
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017/bookstore")
    DATABASE_NAME: str = "bookstore"
    
    # Razorpay settings
    RAZORPAY_KEY_ID: Optional[str] = os.getenv("RAZORPAY_KEY_ID")
    RAZORPAY_SECRET: Optional[str] = os.getenv("RAZORPAY_SECRET")
    
    # Email settings
    EMAIL_HOST: str = os.getenv("EMAIL_HOST", "smtp.gmail.com")
    EMAIL_PORT: int = int(os.getenv("EMAIL_PORT", 587))
    EMAIL_USER: Optional[str] = os.getenv("EMAIL_USER")
    EMAIL_PASSWORD: Optional[str] = os.getenv("EMAIL_PASSWORD")
    
    # CORS settings
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")
    NODE_ENV: str = os.getenv("NODE_ENV", "development")
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
