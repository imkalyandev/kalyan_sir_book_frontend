import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../config';

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch books on component mount
  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/books`);

      if (response.data.success) {
        setBooks(response.data.data);
      }
    } catch (err) {
      setError("Failed to fetch books. Please make sure the server is running.");
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (bookId) => {
    navigate(`/checkout/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            📚 Our Books Collection
          </h1>
          <p className="text-xl text-gray-600">
            Browse our selection of bestselling programming books
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-xl text-gray-600">Loading books...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
            <button
              onClick={getAllBooks}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && books.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No books available at the moment.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Book Image */}
              <div className="h-64 overflow-hidden bg-gray-200">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Book+Cover";
                  }}
                />
              </div>

              {/* Book Details */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {book.title}
                </h2>

                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Author:</span> {book.author}
                </p>

                <p className="text-gray-600 mb-4 line-clamp-3 h-18">
                  {book.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    ₹{book.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                  </span>
                </div>

                <button
                  onClick={() => handleBuyNow(book._id)}
                  disabled={book.stock === 0}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    book.stock > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {book.stock > 0 ? '🛒 Buy Now' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Books;