import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleBooksClick = () => {
    navigate('/books');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">📚 Author's Bookstore</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <a 
              href="#about" 
              className="hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              About Author
            </a>
            <button
              onClick={handleBooksClick}
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Books
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
