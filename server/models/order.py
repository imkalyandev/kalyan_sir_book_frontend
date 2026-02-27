from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
from bson import ObjectId
from enum import Enum

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        return {"type": "string"}

class PaymentStatus(str, Enum):
    PENDING = "Pending"
    PAID = "Paid"
    FAILED = "Failed"

class UserDetails(BaseModel):
    full_name: str = Field(..., alias="fullName")
    address: str
    pincode: str = Field(..., min_length=6, max_length=6)
    mobile: str = Field(..., min_length=10, max_length=10)
    email: EmailStr

    class Config:
        populate_by_name = True

class OrderBase(BaseModel):
    book_id: str = Field(..., alias="bookId")
    user_details: UserDetails = Field(..., alias="userDetails")

class OrderCreate(OrderBase):
    pass

class Order(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    book_id: PyObjectId = Field(..., alias="bookId")
    user_details: UserDetails = Field(..., alias="userDetails")
    payment_id: Optional[str] = Field(None, alias="paymentId")
    order_id: str = Field(..., alias="orderId")
    razorpay_order_id: Optional[str] = Field(None, alias="razorpayOrderId")
    amount: float
    delivery_charges: float = Field(default=50, alias="deliveryCharges")
    total_amount: float = Field(..., alias="totalAmount")
    payment_status: PaymentStatus = Field(default=PaymentStatus.PENDING, alias="paymentStatus")
    delivery_date: Optional[datetime] = Field(None, alias="deliveryDate")
    payment_signature: Optional[str] = Field(None, alias="paymentSignature")
    created_at: Optional[datetime] = Field(None, alias="createdAt")
    updated_at: Optional[datetime] = Field(None, alias="updatedAt")

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        use_enum_values = True
