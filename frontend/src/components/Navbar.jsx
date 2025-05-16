import React, { useEffect, useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import logo from '../assets/logo.png';
import { CartContext } from '../App';  // Import CartContext to sync cart count immediately

const Navbar = ({ isLoggedIn = false, userRole = null }) => {
  const authToken = localStorage.getItem('authToken');
  const storedUserRole = localStorage.getItem('userRole');
  const isAuthenticated = !!authToken;
  
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);  // Get cartItems from context

  const [cartCount, setCartCount] = useState(0);

  // Initialize cart count on mount
  useEffect(() => {
    const initialCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(initialCount);
  }, []);

  // Update cart count whenever cartItems change
  useEffect(() => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  // Sync across tabs/windows via localStorage change
  useEffect(() => {
    const onStorageChange = () => {
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const count = storedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  if (userRole === 'admin' || storedUserRole === 'admin') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    notification.success({
      message: 'Logged Out',
      description: 'You have been successfully logged out.',
      duration: 3,
    });
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
            {isAuthenticated && (
              <li>
                <span
                  className="menu-item cursor-pointer flex items-center space-x-1"
                  onClick={() => window.open('http://127.0.0.1:8000/cart-items', '_blank')}
                  title="View Cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                    <circle cx="7" cy="21" r="2" />
                    <circle cx="17" cy="21" r="2" />
                  </svg>
                  <span className="badge badge-primary text-white text-xs px-1.5 py-0.5 rounded-full leading-none">
                    {cartCount}
                  </span>
                </span>
              </li>
            )}
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

        {isAuthenticated && (
          <div
            className="cursor-pointer relative mx-2"
            onClick={() => navigate('/cart-items')}
            title="View Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary hover:text-primary-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
              <circle cx="7" cy="21" r="2" />
              <circle cx="17" cy="21" r="2" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 badge badge-primary text-white text-xs px-1.5 py-0.5 rounded-full leading-none">
                {cartCount}
              </span>
            )}
          </div>
        )}

        {!isAuthenticated ? (
          <button
            className="btn btn-primary ml-4"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        ) : (
          <button
            className="btn btn-primary ml-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
