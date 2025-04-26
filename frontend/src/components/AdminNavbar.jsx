import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust path if necessary

const AdminNavbar = ({ isAdminLoggedIn, onAdminLogout }) => {
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = () => {
        if (onAdminLogout) {
            onAdminLogout(); // Call the logout function passed from App.jsx
        }
        navigate('/admin'); // Redirect to /admin route after logout
    };

    return (
        <nav className="bg-white text-black font-[ui-sans-serif,system-ui,sans-serif]">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <img
                        src={logo}
                        alt="logo"
                        className="h-12 w-52 cursor-pointer"
                        onClick={() => navigate(isAdminLoggedIn ? '/admin-dashboard' : '/admin')}
                    />
                </div>

                {/* Before-login Navbar */}
                {!isAdminLoggedIn && (
                    <button
                        onClick={() => navigate('/admin')}
                        className="px-4 py-2 bg-[rgb(42,99,255)] text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:shadow-[0_0_10px_rgb(42,99,255)] hover:ring-4 hover:ring-[rgb(42,99,255)] focus:outline-none focus:ring-4 focus:ring-[rgb(42,99,255)]"
                    >
                        Admin Login
                    </button>
                )}

                {/* After-login Navbar */}
                {isAdminLoggedIn && (
                    <div className="hidden lg:flex items-center space-x-4">
                        {[
                            ['Dashboard', '/admin-dashboard'],
                            ['Products', '/admin-dashboard/products'],
                            ['Orders', '/admin-dashboard/orders'],
                            ['Revenue', '/admin-dashboard/revenue'],
                            ['Profile', '/admin-dashboard/profile'],
                        ].map(([label, path]) => (
                            <Link
                                key={label}
                                to={path}
                                className="text-black text-lg font-semibold hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
                            >
                                {label}
                            </Link>
                        ))}

                        <button
                            onClick={handleLogout}
                            className="text-red-600 text-lg font-semibold px-4 py-2 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default AdminNavbar;
