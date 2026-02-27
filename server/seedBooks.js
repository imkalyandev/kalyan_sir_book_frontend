import Book from './models/Book.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Sample books data
const sampleBooks = [
  {
    title: "The Art of React Programming",
    description: "Master modern React development with hooks, context, and best practices. Learn to build scalable applications with real-world examples and patterns.",
    price: 599,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    stock: 50,
    author: "Sarah Johnson"
  },
  {
    title: "JavaScript: The Complete Guide",
    description: "From basics to advanced concepts, this comprehensive guide covers ES6+, async programming, and modern JavaScript development techniques.",
    price: 799,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    stock: 45,
    author: "Michael Chen"
  },
  {
    title: "Node.js Backend Mastery",
    description: "Build powerful backend applications with Node.js, Express, MongoDB, and learn authentication, APIs, and deployment strategies.",
    price: 699,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    stock: 30,
    author: "David Kumar"
  },
  {
    title: "Full Stack Web Development",
    description: "Complete guide to building modern web applications covering frontend, backend, databases, and deployment. Includes MERN stack projects.",
    price: 999,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
    stock: 40,
    author: "Emily Williams"
  },
  {
    title: "Python for Data Science",
    description: "Learn Python programming for data analysis, visualization, and machine learning. Includes pandas, NumPy, and scikit-learn.",
    price: 899,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
    stock: 35,
    author: "Dr. Rajesh Sharma"
  },
  {
    title: "MongoDB Database Design",
    description: "Master NoSQL database design, indexing, aggregation, and performance optimization with MongoDB and Mongoose.",
    price: 649,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
    stock: 25,
    author: "Lisa Anderson"
  }
];

// Connect to MongoDB and seed data
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
    // Clear existing books
    await Book.deleteMany({});
    console.log('🗑️  Cleared existing books');
    
    // Insert sample books
    const books = await Book.insertMany(sampleBooks);
    console.log(`✅ Added ${books.length} books to database`);
    
    console.log('\n📚 Sample Books:');
    books.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title} - ₹${book.price}`);
    });
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
