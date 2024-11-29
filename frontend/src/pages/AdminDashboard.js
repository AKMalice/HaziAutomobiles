// AdminDashboard.js
import React, { useState } from 'react';
import { Home, Package, ShoppingCart, DollarSign, User } from 'lucide-react';
import HomePage from './HomePage';
import ProductList from './ProductList';
import OrdersPage from './OrdersPage';
import RevenuePage from './Revenue';
import ProfilePage from './AdminProfile';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('Home');

  const navLinks = [
    { name: 'Home', icon: Home },
    { name: 'Products', icon: Package },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Revenue', icon: DollarSign },
    { name: 'Profile', icon: User },
  ];

  const NavLink = ({ name, icon: Icon }) => (
    <button
      onClick={() => setActivePage(name)}
      className={`flex items-center w-full p-4 transition-all duration-300 ${
        activePage === name
          ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white'
          : 'text-gray-300 hover:bg-blue-800'
      } rounded-lg mb-2 group`}
    >
      <Icon className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110" />
      <span className="text-sm font-medium">{name}</span>
    </button>
  );

  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <HomePage />;
      case 'Products':
        return <ProductList />;
      case 'Orders':
        return <OrdersPage />;
      case 'Revenue' : 
        return <RevenuePage/>;
      case 'Profile' : 
        return <ProfilePage/>;
      // Add other pages here as they are implemented
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="w-64 bg-gray-800 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          Admin Dashboard
        </h1>
        {navLinks.map((link) => (
          <NavLink key={link.name} {...link} />
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default AdminDashboard;