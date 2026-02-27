from fastapi import APIRouter, HTTPException, Query

from models.order import Order, OrderCreate
from controllers import order_controller

router = APIRouter()

@router.post("/", response_model=None)
async def create_order(order: OrderCreate):
    """Create a new order"""
    try:
        created_order = await order_controller.create_order(order)
        return {
            "success": True,
            "message": "Order created successfully",
            "data": created_order
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{order_id}", response_model=None)
async def get_order(order_id: str):
    """Get order by MongoDB ID"""
    try:
        order = await order_controller.get_order_by_id(order_id)
        return {
            "success": True,
            "data": order
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=None)
async def get_orders(orderId: str = Query(None)):
    """Get all orders or filter by orderId"""
    try:
        if orderId:
            # Get single order by orderId field
            order = await order_controller.get_order_by_order_id(orderId)
            return {
                "success": True,
                "data": [order]
            }
        else:
            # Get all orders
            orders = await order_controller.get_all_orders()
            return {
                "success": True,
                "data": orders
            }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
