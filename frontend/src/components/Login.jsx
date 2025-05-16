import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import api from '../utils/api';

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedNotification = localStorage.getItem('notification');
    if (storedNotification) {
      try {
        const { message, description } = JSON.parse(storedNotification);
        notification.error({
          message,
          description,
          duration: 5,
        });
        localStorage.removeItem('notification');
      } catch (error) {
        console.error('Error parsing notification:', error);
        localStorage.removeItem('notification');
      }
    }

    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      // Redirect based on role
      const role = localStorage.getItem('userRole');
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/products');
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/login/', {
        email,
        password
      });

      const { token, role } = response.data;
      
      // Store token and role in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      
      // The API utility will automatically add the token to future requests
      
      // Show success notification
      notification.success({
        message: 'Login Successful',
        description: `Welcome back!`,
        duration: 3,
      });
      
      // Update authentication state in App.jsx
      if (props.onLoginSuccess) {
        props.onLoginSuccess(role);
      }
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/products');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      notification.error({
        message: 'Login Failed',
        description: errorMessage,
        duration: 5,
      });
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-neutral mb-6">Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Link to Register Page */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <span className="text-primary cursor-pointer font-bold" onClick={() => navigate('/register')}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
