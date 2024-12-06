import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className="navbar bg-white/50 backdrop-blur-md fixed top-0 z-50">
      <div className="navbar-start pl-4">
        <img src={logo} alt="logo" className="h-12 w-52"/>
        {/* <a className="text-2xl font-bold text-neutral">HAZI Automobiles</a> */}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-neutral text-lg hover:text-white hover:bg-primary focus:text-white focus:bg-primary active:text-white active:bg-primary"
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            <li>
              <a className="my-1 text-neutral text-lg hover:text-white hover:bg-primary active:bg-primary active:text-white">
                Products
              </a>
            </li>
            <li>
              <a className="my-1 text-neutral text-lg hover:text-white hover:bg-primary active:bg-primary active:text-white">
                Solutions
              </a>
            </li>
            <li>
              <a className="my-1 text-neutral text-lg hover:text-white hover:bg-primary active:bg-primary active:text-white">
                About
              </a>
            </li>
            <li>
              <a className="my-1 text-neutral text-lg hover:text-white hover:bg-primary active:bg-primary active:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Full Navbar for Larger Screens */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal pr-4">
          <li>
            <a className="mx-1 text-neutral text-lg hover:text-white hover:bg-primary active:bg-primary active:text-white">
              Products
            </a>
          </li>
          <li>
            <a className="mx-1 text-neutral text-lg hover:text-white hover:bg-primary active:bg-primary active:text-white">
              About
            </a>
          </li>
          <li>
            <a className="mx-1 text-neutral text-lg hover:text-white hover:bg-primary active:bg-primary active:text-white">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
