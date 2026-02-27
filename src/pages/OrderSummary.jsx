import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

function OrderSummary() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/orders?orderId=${orderId}`);
      
      // Find the order by orderId
      const orderData = response.data.data.find(o => o.orderId === orderId);
      
      if (orderData) {
        setOrder(orderData);
      } else {
        alert('Order not found');
        navigate('/books');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Failed to fetch order details');
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setProcessing(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK. Please check your internet connection.');
        setProcessing(false);
        return;
      }

      // Create Razorpay order
      const orderResponse = await axios.post(`${API_URL}/payment/create-order`, {
        orderId: order.orderId
      });

      if (!orderResponse.data.success) {
        alert('Failed to create payment order');
        setProcessing(false);
        return;
      }

      const { razorpayOrderId, amount, currency, keyId } = orderResponse.data.data;

      // Razorpay options
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'Author\'s Bookstore',
        description: `Purchase of ${order.bookId.title}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(`${API_URL}/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order.orderId
            });

            if (verifyResponse.data.success) {
              // Navigate to success page with order details
              navigate('/payment-success', {
                state: {
                  orderDetails: verifyResponse.data.data
                }
              });
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: order.userDetails.fullName,
          email: order.userDetails.email,
          contact: order.userDetails.mobile
        },
        notes: {
          orderId: order.orderId,
          bookTitle: order.bookId.title
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
            // Record payment failure
            axios.post(`${API_URL}/payment/failed`, {
              orderId: order.orderId,
              error: 'Payment cancelled by user'
            }).catch(err => console.error(err));
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setProcessing(false);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-xl text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Order not found</p>
          <button
            onClick={() => navigate('/books')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Order Summary
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Order ID */}
          <div className="mb-6 pb-6 border-b">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-xl font-semibold text-gray-800">{order.orderId}</p>
          </div>

          {/* Book Details */}
          <div className="mb-6 pb-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Details</h2>
            <div className="flex items-center space-x-4">
              <img
                src={order.bookId.image}
                alt={order.bookId.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {order.bookId.title}
                </h3>
                <p className="text-gray-600">by {order.bookId.author}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mb-6 pb-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Delivery Address</h2>
            <p className="text-gray-700 font-semibold">{order.userDetails.fullName}</p>
            <p className="text-gray-600">{order.userDetails.address}</p>
            <p className="text-gray-600">Pincode: {order.userDetails.pincode}</p>
            <p className="text-gray-600">Mobile: {order.userDetails.mobile}</p>
            <p className="text-gray-600">Email: {order.userDetails.email}</p>
          </div>

          {/* Price Breakdown */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Price Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Book Price</span>
                <span className="font-semibold">₹{order.amount}</span>
              </div>
              
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                <span className="font-semibold">₹{order.deliveryCharges}</span>
              </div>
              
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t-2">
                <span>Total Amount</span>
                <span className="text-blue-600">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/books')}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              ← Back
            </button>
            
            <button
              onClick={handlePayment}
              disabled={processing || order.paymentStatus === 'Paid'}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                processing || order.paymentStatus === 'Paid'
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {processing ? 'Processing...' : order.paymentStatus === 'Paid' ? 'Already Paid' : 'Pay Now →'}
            </button>
          </div>

          {order.paymentStatus === 'Paid' && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="font-semibold">✓ Payment Completed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
