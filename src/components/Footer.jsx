function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">📍 Address</h3>
            <p className="text-gray-300">
              123 Book Street<br />
              Literature District<br />
              Mumbai, Maharashtra 400001<br />
              India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">🔗 Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pink-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>📷</span>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>📺</span>
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a 
                  href="#mobile-app" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>📱</span>
                  <span>Download Mobile App</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">📧 Contact</h3>
            <p className="text-gray-300 mb-2">
              Email: author@bookstore.com
            </p>
            <p className="text-gray-300">
              Phone: +91 98765 43210
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Author's Bookstore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
