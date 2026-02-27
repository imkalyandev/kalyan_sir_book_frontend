from fastapi import HTTPException
from bson import ObjectId
from datetime import datetime
from typing import List

from database import get_database
from models.book import Book, BookCreate, BookUpdate

async def get_all_books() -> List[Book]:
    """Get all books with stock > 0"""
    db = get_database()
    books = await db.books.find({"stock": {"$gt": 0}}).sort("created_at", -1).to_list(100)
    return books

async def get_book_by_id(book_id: str) -> Book:
    """Get a single book by ID"""
    if not ObjectId.is_valid(book_id):
        raise HTTPException(status_code=400, detail="Invalid book ID")
    
    db = get_database()
    book = await db.books.find_one({"_id": ObjectId(book_id)})
    
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    return book

async def create_book(book_data: BookCreate) -> Book:
    """Create a new book"""
    db = get_database()
    
    book_dict = book_data.model_dump()
    book_dict["created_at"] = datetime.utcnow()
    book_dict["updated_at"] = datetime.utcnow()
    
    result = await db.books.insert_one(book_dict)
    created_book = await db.books.find_one({"_id": result.inserted_id})
    
    return created_book

async def update_book(book_id: str, book_data: BookUpdate) -> Book:
    """Update a book"""
    if not ObjectId.is_valid(book_id):
        raise HTTPException(status_code=400, detail="Invalid book ID")
    
    db = get_database()
    
    # Get existing book
    existing_book = await db.books.find_one({"_id": ObjectId(book_id)})
    if not existing_book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in book_data.model_dump(exclude_unset=True).items() if v is not None}
    
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        await db.books.update_one(
            {"_id": ObjectId(book_id)},
            {"$set": update_data}
        )
    
    updated_book = await db.books.find_one({"_id": ObjectId(book_id)})
    return updated_book

async def delete_book(book_id: str) -> bool:
    """Delete a book"""
    if not ObjectId.is_valid(book_id):
        raise HTTPException(status_code=400, detail="Invalid book ID")
    
    db = get_database()
    
    result = await db.books.delete_one({"_id": ObjectId(book_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    
    return True
