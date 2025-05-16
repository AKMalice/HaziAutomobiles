import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api'; // Axios instance
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart items from backend and fallback to localStorage if API fails
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('http://127.0.0.1:8000/cart-items');
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error('Failed to fetch cart items from backend, falling back to localStorage');
        const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(savedCart);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading cart items...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <h2 className="text-3xl font-bold mb-6">Your Cart is Empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
        <div className="space-y-6">
          {cartItems.map(({ id, name, price, quantity, size, image }, index) => (
            <div
              key={`${id}-${size}-${index}`}
              className="flex flex-col sm:flex-row items-center bg-white rounded-lg p-4 shadow"
            >
              <img
                src={image}
                alt={name}
                className="w-32 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-gray-600">Size: {size}</p>
                <p className="text-blue-600 font-bold text-lg">${price.toFixed(2)}</p>
                <p className="text-gray-700">Quantity: {quantity}</p>
                <p className="font-semibold">
                  Total: ${(price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={() => navigate('/checkout')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
