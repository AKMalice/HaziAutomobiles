import React from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import logo from '../assets/logo.png';

const Navbar = ({ isLoggedIn = false, userRole = null }) => {
  // Check localStorage directly for more reliable auth state
  const authToken = localStorage.getItem('authToken');
  const storedUserRole = localStorage.getItem('userRole');
  const isAuthenticated = !!authToken; // Convert to boolean
  
  const navigate = useNavigate();

  // Don't render navbar on admin routes
  if (userRole === 'admin' || storedUserRole === 'admin') {
    return null;
  }

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    
    // Show success notification
    notification.success({
      message: 'Logged Out',
      description: 'You have been successfully logged out.',
      duration: 3,
    });
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="navbar bg-white/50 backdrop-blur-md fixed top-0 z-50 w-full">
      <div className="navbar-start pl-4">
        <img
          src={logo}
          alt="logo"
          className="h-12 w-52 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-neutral text-lg hover:text-white hover:bg-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
            <li>
              <span className="menu-item cursor-pointer" onClick={() => navigate('/products')}>
                Products
              </span>
            </li>
            {isAuthenticated && (
              <li>
                <span
                  className="menu-item cursor-pointer"
                  onClick={() => navigate('/order-history')}
                >
                  Order History
                </span>
              </li>
            )}
            <li>
              <span className="menu-item cursor-pointer" onClick={() => navigate('/about')}>
                About
              </span>
            </li>
            <li>
              <span className="menu-item cursor-pointer" onClick={() => navigate('/contact')}>
                Contact
              </span>
            </li>
            <li>
              {!isAuthenticated ? (
                <span
                  className="menu-item text-primary font-bold cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Login
                </span>
              ) : (
                <span
                  className="menu-item text-primary font-bold cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Full Navbar for Larger Screens */}
      <div className="navbar-end hidden lg:flex items-center">
        <ul className="menu menu-horizontal pr-4">
          <li>
            <span
              className="mx-2 text-neutral text-lg hover:text-white hover:bg-primary cursor-pointer"
              onClick={() => navigate('/products')}
            >
              Products
            </span>
          </li>
          {isAuthenticated && (
            <li>
              <span
                className="mx-2 text-neutral text-lg hover:text-white hover:bg-primary cursor-pointer"
                onClick={() => navigate('/order-history')}
              >
                Order History
              </span>
            </li>
          )}
          <li>
            <span
              className="mx-2 text-neutral text-lg hover:text-white hover:bg-primary cursor-pointer"
              onClick={() => navigate('/about')}
            >
              About
            </span>
          </li>
          <li>
            <span
              className="mx-2 text-neutral text-lg hover:text-white hover:bg-primary cursor-pointer"
              onClick={() => navigate('/contact')}
            >
              Contact
            </span>
          </li>
        </ul>
        {!isAuthenticated ? (
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary text-white ml-4"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="btn btn-primary text-white ml-4"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;