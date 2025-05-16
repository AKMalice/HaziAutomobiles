import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import logo from "../assets/logo.png";
import { CartContext } from "../App";

const Navbar = ({ isLoggedIn = false, userRole = null }) => {
  const authToken = localStorage.getItem("authToken");
  const storedUserRole = localStorage.getItem("userRole");
  const isAuthenticated = !!authToken;

  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (userRole === "admin" || storedUserRole === "admin") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    notification.success({
      message: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3,
    });
    navigate("/");
  };

  return (
    <nav className="bg-white/50 backdrop-blur-md fixed top-0 z-50 w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <img
            src={logo}
            alt="logo"
            className="h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost text-neutral hover:bg-primary hover:text-white"
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
            </button>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 z-10 bg-white shadow-md rounded-box w-48"
            >
              <li>
                <span
                  className="cursor-pointer hover:text-primary"
                  onClick={() => navigate("/products")}
                >
                  Products
                </span>
              </li>
              {isAuthenticated && (
                <li>
                  <span
                    className="cursor-pointer hover:text-primary"
                    onClick={() => navigate("/order-history")}
                  >
                    Order History
                  </span>
                </li>
              )}
              <li>
                <span
                  className="cursor-pointer hover:text-primary"
                  onClick={() => navigate("/about")}
                >
                  About
                </span>
              </li>
              <li>
                <span
                  className="cursor-pointer hover:text-primary"
                  onClick={() => navigate("/contact")}
                >
                  Contact
                </span>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <span
                      className="cursor-pointer flex items-center hover:text-primary"
                      onClick={() => navigate("/cart-items")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                        />
                        <circle cx="7" cy="21" r="2" />
                        <circle cx="17" cy="21" r="2" />
                      </svg>
                      <span className="badge badge-primary text-white text-xs px-1.5 py-0.5 rounded-full leading-none ml-1">
                        {cartCount}
                      </span>
                    </span>
                  </li>
                  <li>
                    <span
                      className="text-primary font-bold cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <li>
                  <span
                    className="text-primary font-bold cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Full Navbar for Larger Screens */}
        <div className="hidden lg:flex items-center space-x-10">
          <span
            className="text-neutral hover:text-primary cursor-pointer text-lg"
            onClick={() => navigate("/products")}
          >
            Products
          </span>
          {isAuthenticated && (
            <span
              className="text-neutral hover:text-primary cursor-pointer text-lg"
              onClick={() => navigate("/order-history")}
            >
              Order History
            </span>
          )}
          <span
            className="text-neutral hover:text-primary cursor-pointer text-lg"
            onClick={() => navigate("/about")}
          >
            About
          </span>
          <span
            className="text-neutral hover:text-primary cursor-pointer text-lg"
            onClick={() => navigate("/contact")}
          >
            Contact
          </span>
          {isAuthenticated && (
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart-items")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                />
                <circle cx="7" cy="21" r="2" />
                <circle cx="17" cy="21" r="2" />
              </svg>
              <span className="badge badge-primary text-white text-xs px-1.5 py-0.5 rounded-full absolute -top-2 -right-2">
                {cartCount}
              </span>
            </div>
          )}
          <button
            className={`btn ${
              isAuthenticated
                ? "btn-outline btn-primary"
                : "btn-primary text-white"
            }`}
            onClick={isAuthenticated ? handleLogout : () => navigate("/login")}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
