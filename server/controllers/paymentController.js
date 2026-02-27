import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Book from '../models/Book.js';
import { sendOrderConfirmationEmail } from '../utils/emailService.js';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// Create Razorpay order
export const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find the order
    const order = await Order.findOne({ orderId }).populate('bookId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Create Razorpay order
    const options = {
      amount: order.totalAmount * 100, // amount in paise
      currency: 'INR',
      receipt: order.orderId,
      notes: {
        orderId: order.orderId,
        bookTitle: order.bookId.title
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Update order with Razorpay order ID
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.status(200).json({
      success: true,
      data: {
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating payment order',
      error: error.message
    });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Find and update order
    const order = await Order.findOne({ orderId }).populate('bookId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    order.paymentStatus = 'Paid';
    order.paymentId = razorpay_payment_id;
    order.paymentSignature = razorpay_signature;
    
    // Set delivery date (5-7 days from now)
    const deliveryDays = Math.floor(Math.random() * 3) + 5; // Random between 5-7 days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    order.deliveryDate = deliveryDate;

    await order.save();

    // Reduce book stock
    const book = await Book.findById(order.bookId._id);
    if (book && book.stock > 0) {
      book.stock -= 1;
      await book.save();
    }

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail(order);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the payment if email fails
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        orderId: order.orderId,
        paymentId: razorpay_payment_id,
        deliveryDate: order.deliveryDate,
        bookTitle: order.bookId.title,
        totalAmount: order.totalAmount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};

// Payment failure handler
export const paymentFailed = async (req, res) => {
  try {
    const { orderId, error } = req.body;

    const order = await Order.findOne({ orderId });

    if (order) {
      order.paymentStatus = 'Failed';
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: 'Payment failure recorded'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error recording payment failure',
      error: error.message
    });
  }
};
