from fastapi import HTTPException
import razorpay
import hmac
import hashlib
from datetime import datetime, timedelta
from bson import ObjectId
import random

from database import get_database
from models.order import PaymentStatus
from utils.email_service import send_order_confirmation_email
from config import settings

# Initialize Razorpay
razorpay_client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_SECRET)
)

async def create_payment_order(order_id: str):
    """Create Razorpay order"""
    db = get_database()
    
    # Find order by orderId
    order = await db.orders.find_one({"orderId": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Get book details
    book = await db.books.find_one({"_id": order["bookId"]})
    
    # Create Razorpay order
    razorpay_order = razorpay_client.order.create({
        "amount": int(order["totalAmount"] * 100),  # Amount in paise
        "currency": "INR",
        "receipt": order["orderId"],
        "notes": {
            "orderId": order["orderId"],
            "bookTitle": book["title"] if book else ""
        }
    })
    
    # Update order with Razorpay order ID
    await db.orders.update_one(
        {"orderId": order_id},
        {
            "$set": {
                "razorpayOrderId": razorpay_order["id"],
                "updatedAt": datetime.utcnow()
            }
        }
    )
    
    return {
        "razorpayOrderId": razorpay_order["id"],
        "amount": razorpay_order["amount"],
        "currency": razorpay_order["currency"],
        "keyId": settings.RAZORPAY_KEY_ID
    }

async def verify_payment(payment_data: dict):
    """Verify Razorpay payment signature"""
    razorpay_order_id = payment_data.get("razorpay_order_id")
    razorpay_payment_id = payment_data.get("razorpay_payment_id")
    razorpay_signature = payment_data.get("razorpay_signature")
    order_id = payment_data.get("orderId")
    
    # Verify signature
    generated_signature = hmac.new(
        settings.RAZORPAY_SECRET.encode(),
        f"{razorpay_order_id}|{razorpay_payment_id}".encode(),
        hashlib.sha256
    ).hexdigest()
    
    if generated_signature != razorpay_signature:
        raise HTTPException(status_code=400, detail="Invalid payment signature")
    
    db = get_database()
    
    # Find order
    order = await db.orders.find_one({"orderId": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Get book details
    book = await db.books.find_one({"_id": order["bookId"]})
    
    # Calculate delivery date (5-7 days)
    delivery_days = random.randint(5, 7)
    delivery_date = datetime.utcnow() + timedelta(days=delivery_days)
    
    # Update order
    await db.orders.update_one(
        {"orderId": order_id},
        {
            "$set": {
                "paymentStatus": PaymentStatus.PAID.value,
                "paymentId": razorpay_payment_id,
                "paymentSignature": razorpay_signature,
                "deliveryDate": delivery_date,
                "updatedAt": datetime.utcnow()
            }
        }
    )
    
    # Reduce book stock
    if book and book.get("stock", 0) > 0:
        await db.books.update_one(
            {"_id": book["_id"]},
            {
                "$inc": {"stock": -1},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
    
    # Get updated order
    updated_order = await db.orders.find_one({"orderId": order_id})
    updated_order["bookId"] = book  # Add book details
    
    # Send confirmation email
    try:
        await send_order_confirmation_email(updated_order)
    except Exception as e:
        print(f"Email sending failed: {e}")
    
    return {
        "orderId": order_id,
        "paymentId": razorpay_payment_id,
        "deliveryDate": delivery_date.isoformat(),
        "bookTitle": book["title"] if book else "",
        "totalAmount": updated_order["totalAmount"]
    }

async def payment_failed(order_id: str, error: str = None):
    """Record payment failure"""
    db = get_database()
    
    result = await db.orders.update_one(
        {"orderId": order_id},
        {
            "$set": {
                "paymentStatus": PaymentStatus.FAILED.value,
                "updatedAt": datetime.utcnow()
            }
        }
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return {"message": "Payment failure recorded"}
