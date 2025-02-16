import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Have questions or need support? Reach out to us, and we’ll be happy to assist you.
        </p>

        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl mx-auto">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input type="text" className="w-full border rounded-lg p-2 mt-1 focus:outline-primary" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input type="email" className="w-full border rounded-lg p-2 mt-1 focus:outline-primary" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea className="w-full border rounded-lg p-2 mt-1 h-32 focus:outline-primary" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full text-white">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
