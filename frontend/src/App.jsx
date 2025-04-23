import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import About from './pages/About';
import Contact from './pages/Contact';
import Register from "./components/Register";
import ProductDetails from './components/ProductDetails';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminProducts from './components/AdminProducts';
import AdminOrders from './components/AdminOrders';
import AdminRevenue from './components/AdminRevenue';
import AdminProfile from './components/AdminProfile.jsx';
import AdminNavbar from './components/AdminNavbar';
import OrderHistory from './components/OrderHistory';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleAdminLogin = () => setIsAdminLoggedIn(true);
  const handleAdminLogout = () => setIsAdminLoggedIn(false);
  const handleUserLogout = () => setIsUserLoggedIn(false);

  const isOnAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <Router>
      {/* Conditionally render Navbar or AdminNavbar */}
      {isOnAdminRoute ? (
  <AdminNavbar isAdminLoggedIn={isAdminLoggedIn} onAdminLogout={handleAdminLogout} />
) : (
  <Navbar
    isAdminLoggedIn={isAdminLoggedIn}
    isUserLoggedIn={isUserLoggedIn}
    setIsUserLoggedIn={setIsUserLoggedIn}
    onUserLogout={handleUserLogout}
  />
)}


      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products-list" element={<Products />} /> {/* Alias for Products */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* User-specific routes */}
        {isUserLoggedIn && (
          <Route path="/order-history" element={<OrderHistory />} />
        )}

        {/* Admin login route */}
        <Route path="/admin" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />

        {/* Admin routes */}
        <Route
          path="/admin-dashboard"
          element={isAdminLoggedIn ? <AdminDashboard /> : <AdminLogin onAdminLogin={handleAdminLogin} />}
        />
        <Route
          path="/admin-dashboard/products"
          element={isAdminLoggedIn ? <AdminProducts /> : <AdminLogin onAdminLogin={handleAdminLogin} />}
        />
        <Route
          path="/admin-dashboard/orders"
          element={isAdminLoggedIn ? <AdminOrders /> : <AdminLogin onAdminLogin={handleAdminLogin} />}
        />
        <Route
          path="/admin-dashboard/revenue"
          element={isAdminLoggedIn ? <AdminRevenue /> : <AdminLogin onAdminLogin={handleAdminLogin} />}
        />
        <Route
          path="/admin-dashboard/profile"
          element={isAdminLoggedIn ? <AdminProfile /> : <AdminLogin onAdminLogin={handleAdminLogin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
