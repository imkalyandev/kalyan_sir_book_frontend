import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendOrderConfirmationEmail = async (order) => {
  try {
    const deliveryDate = new Date(order.deliveryDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: order.userDetails.email,
      subject: `Order Confirmation - ${order.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Payment Successful! 🎉</h2>
          
          <p>Dear ${order.userDetails.fullName},</p>
          
          <p>Thank you for your purchase! Your order has been confirmed.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Order Details:</h3>
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Book:</strong> ${order.bookId.title}</p>
            <p><strong>Amount:</strong> ₹${order.amount}</p>
            <p><strong>Delivery Charges:</strong> ₹${order.deliveryCharges}</p>
            <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
            <p><strong>Payment ID:</strong> ${order.paymentId}</p>
          </div>
          
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Delivery Information:</h3>
            <p><strong>Expected Delivery:</strong> ${deliveryDate}</p>
            <p><strong>Delivery Address:</strong><br>${order.userDetails.address}<br>PIN: ${order.userDetails.pincode}</p>
          </div>
          
          <p>If you have any questions, please contact us.</p>
          
          <p>Best regards,<br>Book Store Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to:', order.userDetails.email);
  } catch (error) {
    console.error('❌ Email sending error:', error);
    throw error;
  }
};
