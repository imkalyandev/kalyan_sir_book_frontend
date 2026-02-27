import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (location.state?.orderDetails) {
      setOrderDetails(location.state.orderDetails);
    } else {
      // If no order details, redirect to books page
      setTimeout(() => {
        navigate('/books');
      }, 3000);
    }
  }, [location, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-4 animate-bounce">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-6">
          {/* Order ID */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="text-2xl font-bold text-gray-800">{orderDetails.orderId}</p>
          </div>

          {/* Payment ID */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Payment ID</p>
            <p className="text-lg font-semibold text-gray-800 break-all">
              {orderDetails.paymentId}
            </p>
          </div>

          {/* Book Details */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Book Purchased</p>
            <p className="text-xl font-semibold text-gray-800">
              {orderDetails.bookTitle}
            </p>
          </div>

          {/* Amount Paid */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Amount Paid</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{orderDetails.totalAmount}
            </p>
          </div>

          {/* Delivery Information */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Expected Delivery</p>
                <p className="text-lg font-bold text-blue-800">
                  {formatDate(orderDetails.deliveryDate)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Your book will be delivered within 5-7 business days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">
                A confirmation email and SMS have been sent to your registered email and mobile number.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/books')}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Continue Shopping
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
          >
            Go to Home
          </button>
        </div>

        {/* Print/Download Receipt */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.print()}
            className="text-blue-600 hover:text-blue-800 font-semibold underline"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
