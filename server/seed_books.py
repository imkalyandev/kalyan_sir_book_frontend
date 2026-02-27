import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from config import settings

# Sample books data
sample_books = [
    {
        "title": "The Art of React Programming",
        "description": "Master modern React development with hooks, context, and best practices. Learn to build scalable applications with real-world examples and patterns.",
        "price": 599,
        "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
        "stock": 50,
        "author": "Sarah Johnson",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "JavaScript: The Complete Guide",
        "description": "From basics to advanced concepts, this comprehensive guide covers ES6+, async programming, and modern JavaScript development techniques.",
        "price": 799,
        "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        "stock": 45,
        "author": "Michael Chen",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "Node.js Backend Mastery",
        "description": "Build powerful backend applications with Node.js, Express, MongoDB, and learn authentication, APIs, and deployment strategies.",
        "price": 699,
        "image": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
        "stock": 30,
        "author": "David Kumar",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "Full Stack Web Development",
        "description": "Complete guide to building modern web applications covering frontend, backend, databases, and deployment. Includes MERN stack projects.",
        "price": 999,
        "image": "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
        "stock": 40,
        "author": "Emily Williams",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "Python for Data Science",
        "description": "Learn Python programming for data analysis, visualization, and machine learning. Includes pandas, NumPy, and scikit-learn.",
        "price": 899,
        "image": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
        "stock": 35,
        "author": "Dr. Rajesh Sharma",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "MongoDB Database Design",
        "description": "Master NoSQL database design, indexing, aggregation, and performance optimization with MongoDB and Mongoose.",
        "price": 649,
        "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
        "stock": 25,
        "author": "Lisa Anderson",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

async def seed_database():
    """Seed the database with sample books"""
    try:
        # Connect to MongoDB
        print("🐍 Python Database Seeder")
        client = AsyncIOMotorClient(settings.MONGODB_URI)
        db = client[settings.DATABASE_NAME]
        
        print("✅ MongoDB Connected")
        
        # Clear existing books
        await db.books.delete_many({})
        print("🗑️  Cleared existing books")
        
        # Insert sample books
        result = await db.books.insert_many(sample_books)
        print(f"✅ Added {len(result.inserted_ids)} books to database")
        
        # Display books
        print("\n📚 Sample Books:")
        books = await db.books.find().to_list(100)
        for idx, book in enumerate(books, 1):
            print(f"{idx}. {book['title']} - ₹{book['price']}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(seed_database())
