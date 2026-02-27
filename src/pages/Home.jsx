import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "React Masterclass",
      description: "Learn React from basics to advanced concepts with hands-on projects",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Full Stack Development",
      description: "Complete MERN stack course with real-world applications",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Advanced JavaScript",
      description: "Master modern JavaScript ES6+ features and patterns",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Author's Bookstore</h1>
          <p className="text-xl mb-8">Discover amazing books and courses by renowned author</p>
          <button
            onClick={() => navigate('/books')}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Explore Books
          </button>
        </div>
      </section>

      {/* Author Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Author Image */}
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop"
                alt="Author"
                className="rounded-full shadow-2xl w-80 h-80 object-cover border-8 border-white"
              />
            </div>

            {/* Author Bio */}
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About the Author</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                With over 15 years of experience in software development and education, 
                our author has helped thousands of students and professionals master 
                modern web technologies.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                A passionate educator and bestselling author, specializing in React, 
                Node.js, and full-stack development.
              </p>

              {/* Achievements */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🏆 Achievements</h3>
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="text-2xl">✅</span>
                  <span className="text-lg">10+ Bestselling Books Published</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="text-2xl">✅</span>
                  <span className="text-lg">50,000+ Students Worldwide</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="text-2xl">✅</span>
                  <span className="text-lg">Award-Winning Online Courses</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="text-2xl">✅</span>
                  <span className="text-lg">Tech Conference Speaker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses/Ads Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Featured Courses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {course.description}
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8">Get your copies today and begin your journey to mastery</p>
          <button
            onClick={() => navigate('/books')}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Browse All Books
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;