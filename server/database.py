from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ServerSelectionTimeoutError
from config import settings

client = None
db = None

async def connect_db():
    global client, db
    try:
        client = AsyncIOMotorClient(
            settings.MONGODB_URI,
            serverSelectionTimeoutMS=5000,
            socketTimeoutMS=45000
        )
        # Test connection
        await client.admin.command('ping')
        db = client[settings.DATABASE_NAME]
        print(f"✅ MongoDB Connected to {settings.DATABASE_NAME}")
        print(f"🐍 Python FastAPI Backend Ready!")
    except ServerSelectionTimeoutError as e:
        print(f"❌ MongoDB Connection Error: {e}")
        raise

async def close_db():
    global client
    if client:
        client.close()
        print("MongoDB connection closed")

def get_database():
    return db
