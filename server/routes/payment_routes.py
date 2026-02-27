from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from controllers import payment_controller

router = APIRouter()

class CreateOrderRequest(BaseModel):
    orderId: str

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    orderId: str

class PaymentFailedRequest(BaseModel):
    orderId: str
    error: Optional[str] = None

@router.post("/create-order", response_model=None)
async def create_payment_order(request: CreateOrderRequest):
    """Create Razorpay order"""
    try:
        result = await payment_controller.create_payment_order(request.orderId)
        return {
            "success": True,
            "data": result
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify", response_model=None)
async def verify_payment(request: VerifyPaymentRequest):
    """Verify payment signature"""
    try:
        result = await payment_controller.verify_payment(request.model_dump())
        return {
            "success": True,
            "message": "Payment verified successfully",
            "data": result
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/failed", response_model=None)
async def payment_failed(request: PaymentFailedRequest):
    """Record payment failure"""
    try:
        result = await payment_controller.payment_failed(
            request.orderId,
            request.error
        )
        return {
            "success": True,
            "message": "Payment failure recorded"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
