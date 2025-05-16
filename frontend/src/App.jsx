import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './components/Products';
import Navbar from './components/Navbar';
import Login from './components/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import CartItems from './components/CartItems.jsx';
import AdminDashboard from './components/AdminDashboard';
import AdminProducts from './components/AdminProducts';
import AdminOrders from './components/AdminOrders';
import AdminRevenue from './components/AdminRevenue';
import AdminProfile from './components/AdminProfile.jsx';
import AdminNavbar from './components/AdminNavbar';
import OrderHistory from './components/OrderHistory';
import setupAxiosInterceptors from './utils/axiosInterceptor';

// Create Cart Context
export const CartContext = createContext();

function AppContent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Cart state shared globally via context
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cartItems')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setupAxiosInterceptors(navigate);
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem('userRole'));
    }
  }, [navigate]);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const onLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const isOnAdminRoute =
    window.location.pathname.startsWith('/admin-dashboard') && userRole === 'admin';

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {isOnAdminRoute ? (
        <AdminNavbar isLoggedIn={isLoggedIn && userRole === 'admin'} />
      ) : (
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} cartItems={cartItems} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart-items" element={<CartItems />} />
        <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/order-history"
          element={isLoggedIn ? <OrderHistory /> : <Navigate to="/login" replace />}
        />
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
    </CartContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
