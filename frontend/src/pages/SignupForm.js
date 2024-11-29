import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Phone, Key, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Alert = ({ variant, message }) => {
  const styles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
  };

  return (
    <div className={`p-4 rounded-md ${styles[variant]} transition-opacity duration-300`}>
      {message}
    </div>
  );
};

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [signupStatus, setSignupStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          setSignupStatus({ type: 'success', message: 'Signup successful! Redirecting to your dashboard...' });
          setTimeout(() => {
            setSignupStatus({ type: 'success', message: `Welcome to the ${data.user_type === 'admin' ? 'Admin' : 'User'} Dashboard!` });
          }, 2000);
        } else {
          setSignupStatus({ type: 'error', message: data.message || 'Signup failed! Please try again.' });
        }
      } catch (error) {
        setSignupStatus({ type: 'error', message: 'Connection failure! Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full space-y-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
        >
          <Key className="mx-auto h-20 w-auto text-white animate-pulse" />
          <h2 className="mt-6 text-center text-4xl font-extrabold text-white">
            Join the Club
          </h2>
          <p className="mt-2 text-center text-xl text-blue-200">
            Sign up to HaziAutomobile's Club
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <AnimatePresence>
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="rounded-md shadow-sm space-y-4">
                <div className="relative">
                  <User className="absolute top-3 left-3 h-6 w-6 text-pink-400" />
                  <input
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute top-3 left-3 h-6 w-6 text-pink-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Password Field with Show/Hide */}
                <div className="relative">
                  <Lock className="absolute top-3 left-3 h-6 w-6 text-pink-400" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>

                {/* Confirm Password Field with Show/Hide */}
                <div className="relative">
                  <Lock className="absolute top-3 left-3 h-6 w-6 text-pink-400" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>

                <div className="relative">
                  <Phone className="absolute top-3 left-3 h-6 w-6 text-pink-400" />
                  <input
                    name="phoneNumber"
                    type="tel"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {(errors.email || errors.password || errors.confirmPassword || errors.name || errors.phoneNumber) && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm font-medium"
                >
                  {errors.email || errors.password || errors.confirmPassword || errors.name || errors.phoneNumber}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            type="submit"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Key className="h-5 w-5 text-blue-300 group-hover:text-blue-400" aria-hidden="true" />
            </span>
            Ignite & Signup
          </motion.button>
        </form>

        <div className="mt-4">
          {signupStatus && <Alert variant={signupStatus.type} message={signupStatus.message} />}
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
