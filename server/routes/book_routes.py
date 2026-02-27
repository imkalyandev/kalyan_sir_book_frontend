from fastapi import APIRouter, HTTPException
from typing import List

from models.book import Book, BookCreate, BookUpdate
from controllers import book_controller

router = APIRouter()

@router.get("/", response_model=None)
async def get_all_books():
    """Get all books with stock > 0"""
    try:
        books = await book_controller.get_all_books()
        return {"success": True, "data": books}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{book_id}", response_model=None)
async def get_book(book_id: str):
    """Get a single book by ID"""
    try:
        book = await book_controller.get_book_by_id(book_id)
        return {"success": True, "data": book}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=None)
async def create_book(book: BookCreate):
    """Create a new book"""
    try:
        created_book = await book_controller.create_book(book)
        return {
            "success": True,
            "message": "Book created successfully",
            "data": created_book
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{book_id}", response_model=None)
async def update_book(book_id: str, book: BookUpdate):
    """Update a book"""
    try:
        updated_book = await book_controller.update_book(book_id, book)
        return {
            "success": True,
            "message": "Book updated successfully",
            "data": updated_book
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{book_id}")
async def delete_book(book_id: str):
    """Delete a book"""
    try:
        await book_controller.delete_book(book_id)
        return {
            "success": True,
            "message": "Book deleted successfully"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
