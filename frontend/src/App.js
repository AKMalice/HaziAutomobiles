import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignupForm from './pages/SignupForm';
import Hello from './pages/Hello';
import AdminDashboard from './pages/AdminDashboard';
import OrderDetailsPage from './pages/OrderDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Hello/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<AdminDashboard/>}/>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
