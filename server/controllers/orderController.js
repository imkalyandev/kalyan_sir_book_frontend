import Order from '../models/Order.js';
import Book from '../models/Book.js';

// Create order with user details
export const createOrder = async (req, res) => {
  try {
    const { bookId, userDetails } = req.body;

    // Validate book exists and has stock
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.stock < 1) {
      return res.status(400).json({
        success: false,
        message: 'Book out of stock'
      });
    }

    // Generate unique order ID
    const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Calculate total amount
    const deliveryCharges = 50;
    const totalAmount = book.price + deliveryCharges;

    const order = await Order.create({
      bookId,
      userDetails,
      orderId,
      amount: book.price,
      deliveryCharges,
      totalAmount,
      paymentStatus: 'Pending'
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('bookId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('bookId').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};
