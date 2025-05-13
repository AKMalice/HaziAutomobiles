import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import About from './pages/About';
import Contact from './pages/Contact';
import Register from "./components/Register";
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart'; // Import Cart component
import AdminDashboard from './components/AdminDashboard';
import AdminProducts from './components/AdminProducts';
import AdminOrders from './components/AdminOrders';
import AdminRevenue from './components/AdminRevenue';
import AdminProfile from './components/AdminProfile.jsx';
import AdminNavbar from './components/AdminNavbar';
import OrderHistory from './components/OrderHistory';
import setupAxiosInterceptors from './utils/axiosInterceptor';
import api from './utils/api';
import { notification } from 'antd';

// Create a wrapper component to use the useNavigate hook
function AppContent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  
  useEffect(() => {
    // Set up axios interceptors
    setupAxiosInterceptors(navigate);
    
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem('userRole'));
      // API utility will automatically add the token to requests
    }
  }, [navigate]);
  
  const onLoginSuccess = (role) => {
    console.log('onLoginSuccess called, role:', role);
    setIsLoggedIn(true);
    setUserRole(role);
  };

  // Note: Logout is now handled directly in the Navbar and AdminNavbar components

  // Check if user is on an admin route and is logged in as admin
  const isOnAdminRoute = window.location.pathname.startsWith('/admin-dashboard') && userRole === 'admin';

  return (
    <>
      {/* Conditionally render Navbar or AdminNavbar */}
      {isOnAdminRoute ? (
        <AdminNavbar isLoggedIn={isLoggedIn && userRole === 'admin'} />
      ) : (
        <Navbar
          isLoggedIn={isLoggedIn}
          userRole={userRole}
        />
      )}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products-list" element={<Products />} /> {/* Alias for Products */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
        <Route path="/checkout" element={<div>Checkout Page</div>} /> {/* Placeholder for Checkout */}
        <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* User-specific routes */}
        <Route path="/order-history" element={
          isLoggedIn ? <OrderHistory /> : <Navigate to="/login" replace />
        } />

        {/* Admin routes with role-based protection */}
        <Route
          path="/admin-dashboard"
          element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin-dashboard/products"
          element={isLoggedIn && userRole === 'admin' ? <AdminProducts /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin-dashboard/orders"
          element={isLoggedIn && userRole === 'admin' ? <AdminOrders /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin-dashboard/revenue"
          element={isLoggedIn && userRole === 'admin' ? <AdminRevenue /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin-dashboard/profile"
          element={isLoggedIn && userRole === 'admin' ? <AdminProfile /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
}

// Wrapper component to provide the Router context
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
