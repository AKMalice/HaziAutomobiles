import React, { useState } from 'react';
import { User, Phone, Mail, Briefcase, Camera, Lock } from 'lucide-react';

const userProfileData = {
  name: 'John Doe',
  phone: '+1 234 567 890',
  email: 'john.doe@example.com',
  role: 'Admin',
  imageUrl: '/api/placeholder/200/200',
};

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(userProfileData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    console.log('Profile updated:', userProfile);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-8 font-sans">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">My Profile</h2>
        <div className="flex">
          {/* Profile Image */}
          <div className="w-1/3 flex flex-col items-center justify-center pr-8 border-r border-gray-600">
            <div className="relative mb-6">
              <img
                src={userProfile.imageUrl}
                alt="Profile"
                className="w-48 h-48 rounded-full border-4 border-blue-600 object-cover"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors duration-200">
                <Camera size={24} />
              </button>
            </div>
            <h3 className="text-2xl font-semibold mb-2">{userProfile.name}</h3>
            <p className="text-gray-400">{userProfile.role}</p>
          </div>

          {/* Profile Details */}
          <div className="w-2/3 pl-8">
            <form className="space-y-6">
              <div className="space-y-4">
                <InputField
                  icon={<User />}
                  label="Name"
                  name="name"
                  value={userProfile.name}
                  onChange={handleChange}
                />
                <InputField
                  icon={<Phone />}
                  label="Phone"
                  name="phone"
                  value={userProfile.phone}
                  onChange={handleChange}
                />
                <InputField
                  icon={<Mail />}
                  label="Email"
                  name="email"
                  value={userProfile.email}
                  onChange={handleChange}
                />
                <InputField
                  icon={<Briefcase />}
                  label="Role"
                  name="role"
                  value={userProfile.role}
                  onChange={handleChange}
                  disabled
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-500">
                  Update Profile
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-500">
                  <Lock size={18} className="mr-2" />
                  Change Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ icon, label, ...props }) => (
  <div className="relative">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      />
    </div>
  </div>
);

const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg text-white transition duration-200 ${className}`}
  >
    {children}
  </button>
);

export default ProfilePage;