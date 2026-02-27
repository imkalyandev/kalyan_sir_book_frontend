"""
Script to run the FastAPI server locally
Pure Python - No JavaScript!
"""
import uvicorn
from config import settings

if __name__ == "__main__":
    print("=" * 50)
    print("🐍 Starting Python FastAPI Server")
    print("=" * 50)
    print(f"Environment: {settings.NODE_ENV}")
    print(f"Port: {settings.PORT}")
    print(f"Database: {settings.DATABASE_NAME}")
    print(f"API Docs: http://localhost:{settings.PORT}/docs")
    print("=" * 50)
    
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
