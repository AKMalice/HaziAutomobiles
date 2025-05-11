import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import logo from '../assets/logo.png'; // Adjust path if necessary

const AdminNavbar = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    // Handle logout
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

    // If not logged in as admin, don't render anything
    if (!isLoggedIn) {
        return null;
    }
    
    // Only render the admin navbar when logged in as admin
    return (
        <nav className="bg-white text-black font-[ui-sans-serif,system-ui,sans-serif]">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <img
                        src={logo}
                        alt="logo"
                        className="h-12 w-52 cursor-pointer"
                        onClick={() => navigate('/admin-dashboard')}
                    />
                </div>

                {/* Admin Navigation Links */}
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
            </div>
        </nav>
    );
};

export default AdminNavbar;
