import React from 'react';
import Navbar from '../components/Navbar';

// Import images
import mailIcon from '../assets/mail-icon.png';
import phoneIcon from '../assets/phone-icon.png';
import locationPin from '../assets/location-pin.jpg';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Get in Touch</h3>
              <p className="text-gray-700 mb-4">
                We're here to help with any questions or concerns. Feel free to connect with us using the information below.
              </p>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <img src={mailIcon} alt="Mail Icon" className="h-6 w-6" />
                  <a href="mailto:haziandco@gmail.com" className="text-gray-700 hover:underline">
                    haziandco@gmail.com
                  </a>
                </div>
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <img src={phoneIcon} alt="Phone Icon" className="h-6 w-6" />
                  <a href="tel:+918885541155" className="text-gray-700 hover:underline">
                    +91 8885541155
                  </a>
                </div>
                {/* Location */}
                <div className="flex items-center space-x-4">
                  <img src={locationPin} alt="Location Pin" className="h-6 w-6" />
                  <p className="text-gray-700">
                    18-633, Near Navata Transport, Kanuru Donka Road, Autonagar, Vijayawada, 520007
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Office hours: Mon - Fri, 9:00 AM - 5:00 PM. Feel free to visit or drop us an email anytime!
            </p>
          </div>

          {/* Google Map */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[400px] md:h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3636.1637149587145!2d80.6816944!3d16.5036944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDMwJzEzLjMiTiA4MMKwNDAnNTQuMSJF!5e1!3m2!1sen!2sin!4v1750334109542!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-none"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
