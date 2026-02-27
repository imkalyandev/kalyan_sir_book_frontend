from fastapi import HTTPException
from bson import ObjectId
from datetime import datetime
import time
import random
from typing import List

from database import get_database
from models.order import Order, OrderCreate, PaymentStatus

async def create_order(order_data: OrderCreate) -> Order:
    """Create a new order with user details"""
    db = get_database()
    
    # Validate book exists and has stock
    book_id = order_data.book_id
    if not ObjectId.is_valid(book_id):
        raise HTTPException(status_code=400, detail="Invalid book ID")
    
    book = await db.books.find_one({"_id": ObjectId(book_id)})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    if book.get("stock", 0) < 1:
        raise HTTPException(status_code=400, detail="Book out of stock")
    
    # Generate unique order ID
    order_id = f"ORD{int(time.time())}{random.randint(100, 999)}"
    
    # Calculate total amount
    delivery_charges = 50
    total_amount = book["price"] + delivery_charges
    
    # Create order document
    order_dict = {
        "bookId": ObjectId(book_id),
        "userDetails": order_data.user_details.model_dump(by_alias=True),
        "orderId": order_id,
        "amount": book["price"],
        "deliveryCharges": delivery_charges,
        "totalAmount": total_amount,
        "paymentStatus": PaymentStatus.PENDING.value,
        "paymentId": None,
        "razorpayOrderId": None,
        "deliveryDate": None,
        "paymentSignature": None,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    result = await db.orders.insert_one(order_dict)
    created_order = await db.orders.find_one({"_id": result.inserted_id})
    
    return created_order

async def get_order_by_id(order_id: str) -> Order:
    """Get order by MongoDB ID"""
    if not ObjectId.is_valid(order_id):
        raise HTTPException(status_code=400, detail="Invalid order ID")
    
    db = get_database()
    
    # Aggregate to populate book details
    pipeline = [
        {"$match": {"_id": ObjectId(order_id)}},
        {
            "$lookup": {
                "from": "books",
                "localField": "bookId",
                "foreignField": "_id",
                "as": "bookId"
            }
        },
        {"$unwind": "$bookId"}
    ]
    
    orders = await db.orders.aggregate(pipeline).to_list(1)
    
    if not orders:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return orders[0]

async def get_all_orders() -> List[Order]:
    """Get all orders with populated book details"""
    db = get_database()
    
    pipeline = [
        {
            "$lookup": {
                "from": "books",
                "localField": "bookId",
                "foreignField": "_id",
                "as": "bookId"
            }
        },
        {"$unwind": "$bookId"},
        {"$sort": {"createdAt": -1}}
    ]
    
    orders = await db.orders.aggregate(pipeline).to_list(100)
    return orders

async def get_order_by_order_id(order_id: str) -> Order:
    """Get order by orderId field"""
    db = get_database()
    
    pipeline = [
        {"$match": {"orderId": order_id}},
        {
            "$lookup": {
                "from": "books",
                "localField": "bookId",
                "foreignField": "_id",
                "as": "bookId"
            }
        },
        {"$unwind": "$bookId"}
    ]
    
    orders = await db.orders.aggregate(pipeline).to_list(1)
    
    if not orders:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return orders[0]
