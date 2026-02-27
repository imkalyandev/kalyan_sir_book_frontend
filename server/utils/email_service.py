import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from config import settings

async def send_order_confirmation_email(order: dict):
    """Send order confirmation email"""
    try:
        # Email configuration
        smtp_host = settings.EMAIL_HOST
        smtp_port = settings.EMAIL_PORT
        smtp_user = settings.EMAIL_USER
        smtp_password = settings.EMAIL_PASSWORD
        
        if not smtp_user or not smtp_password:
            print("Email credentials not configured")
            return
        
        # Format delivery date
        delivery_date = order.get("deliveryDate")
        if isinstance(delivery_date, datetime):
            delivery_date_str = delivery_date.strftime("%A, %B %d, %Y")
        else:
            delivery_date_str = "5-7 business days"
        
        # Get user details
        user_details = order.get("userDetails", {})
        book = order.get("bookId", {})
        
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = f"Order Confirmation - {order['orderId']}"
        message["From"] = smtp_user
        message["To"] = user_details.get("email", "")
        
        # HTML content
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Payment Successful! 🎉</h2>
            
            <p>Dear {user_details.get('fullName', 'Customer')},</p>
            
            <p>Thank you for your purchase! Your order has been confirmed.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Order Details:</h3>
                <p><strong>Order ID:</strong> {order['orderId']}</p>
                <p><strong>Book:</strong> {book.get('title', 'N/A')}</p>
                <p><strong>Amount:</strong> ₹{order.get('amount', 0)}</p>
                <p><strong>Delivery Charges:</strong> ₹{order.get('deliveryCharges', 50)}</p>
                <p><strong>Total Amount:</strong> ₹{order.get('totalAmount', 0)}</p>
                <p><strong>Payment ID:</strong> {order.get('paymentId', 'N/A')}</p>
            </div>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1e40af;">Delivery Information:</h3>
                <p><strong>Expected Delivery:</strong> {delivery_date_str}</p>
                <p><strong>Delivery Address:</strong><br>
                {user_details.get('address', '')}<br>
                PIN: {user_details.get('pincode', '')}</p>
            </div>
            
            <p>If you have any questions, please contact us.</p>
            
            <p>Best regards,<br>Book Store Team</p>
        </div>
        """
        
        part = MIMEText(html_content, "html")
        message.attach(part)
        
        # Send email
        await aiosmtplib.send(
            message,
            hostname=smtp_host,
            port=smtp_port,
            username=smtp_user,
            password=smtp_password,
            start_tls=True,
        )
        
        print(f"✅ Email sent successfully to: {user_details.get('email')}")
        
    except Exception as e:
        print(f"❌ Email sending error: {e}")
        raise
