import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar */}
      <Navbar />

      {/* Content with padding to avoid navbar overlap */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h2 className="text-4xl font-bold text-center mb-6">About Us</h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Welcome to Hazi Automobiles, a leading manufacturer of precision-engineered 
          heavy equipment parts. With over 15 years of experience, we are committed to 
          delivering durable and high-performance products for various industries.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To provide high-quality, reliable, and innovative solutions for heavy 
              equipment, ensuring durability and efficiency in every product we offer.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the global leader in heavy equipment manufacturing, known for 
              excellence, innovation, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
