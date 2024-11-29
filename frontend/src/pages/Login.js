import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Mail, Lock, Key } from 'lucide-react';
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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          // Store JWT token
          localStorage.setItem('token', data.token);
          setLoginStatus({ type: 'success', message: 'Ignition on! Redirecting to your dashboard...' });
          // Simulate redirection
          setTimeout(() => {
            setLoginStatus({ type: 'success', message: `Welcome to the ${data.user_type === 'admin' ? 'Admin' : 'User'} Dashboard!` });
            navigate('/dashboard'); // Navigate to dashboard
          }, 2000);
        } else {
          setLoginStatus({ type: 'error', message: data.message || 'Engine stall! Please check your credentials.' });
        }
      } catch (error) {
        setLoginStatus({ type: 'error', message: 'Connection failure! Please try again.' });
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
  initial={{ opacity: 0, x: -300 }} // Start from the left (off-screen)
  animate={{ opacity: 1, x: 0 }}    // Move to the center (on-screen)
  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }} // Smooth transition with delay
>
  <Car className="mx-auto h-20 w-auto text-white animate-pulse" />

          <h2 className="mt-6 text-center text-4xl font-extrabold text-white">
            Start Your Engine
          </h2>
          <p className="mt-2 text-center text-xl text-blue-200">
            Log in to HaziAutomobile's Club
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <AnimatePresence>
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="relative mb-4">
                  <Mail className="absolute top-3 left-3 h-6 w-6 text-blue-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-t-lg relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="Fuel up with your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute top-3 left-3 h-6 w-6 text-blue-400" />
                  <input
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-b-lg relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="Enter your ignition key"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {(errors.email || errors.password) && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-yellow-300 text-sm mt-2 font-semibold"
                >
                  {errors.email || errors.password}
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
  Rev Up & Login
</motion.button>

        </form>

        <AnimatePresence>
          {loginStatus && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Alert variant={loginStatus.type === 'success' ? 'success' : 'error'} message={loginStatus.message} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
