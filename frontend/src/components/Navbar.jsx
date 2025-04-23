import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = ({ isAdminLoggedIn }) => {
  const navigate = useNavigate();

  // If the admin is logged in, do not show this Navbar
  if (isAdminLoggedIn) {
    return null;
  }

  return (
    <div className="navbar bg-white/50 backdrop-blur-md fixed top-0 z-50 w-full">
      <div className="navbar-start pl-4">
        <img src={logo} alt="logo" className="h-12 w-52 cursor-pointer" onClick={() => navigate('/')} />
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
              className="h-5 w-5"
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
            <li><span className="menu-item cursor-pointer" onClick={() => navigate('/products')}>Products</span></li>
            <li><span className="menu-item cursor-pointer" onClick={() => navigate('/solutions')}>Solutions</span></li>
            <li><span className="menu-item cursor-pointer" onClick={() => navigate('/about')}>About</span></li>
            <li><span className="menu-item cursor-pointer" onClick={() => navigate('/contact')}>Contact</span></li>
            <li><span className="menu-item text-primary font-bold cursor-pointer" onClick={() => navigate('/login')}>Login</span></li>
          </ul>
        </div>
      </div>

      {/* Full Navbar for Larger Screens */}
      <div className="navbar-end hidden lg:flex items-center">
        <ul className="menu menu-horizontal pr-4">
          <li><span className="mx-1 text-neutral text-lg hover:text-white hover:bg-primary cursor-pointer" onClick={() => navigate('/products')}>Products</span></li>
          <li><span className="mx-1 text-neutral text-lg hover:text-white hover:bg-primary cursor-pointer" onClick={() => navigate('/about')}>About</span></li>
          <li><span className="mx-1 text-neutral text-lg hover:text-white hover:bg-primary cursor-pointer" onClick={() => navigate('/contact')}>Contact</span></li>
        </ul>
        <button onClick={() => navigate('/login')} className="btn btn-primary text-white ml-4">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
