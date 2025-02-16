import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-neutral mb-6">Login</h2>
        
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">Login</button>
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
