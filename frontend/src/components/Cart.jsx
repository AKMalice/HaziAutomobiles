import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  if (!product) {
    return <p className="text-center mt-12">Your cart is empty.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      <div className="max-w-[90%] mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-24 w-24 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.desc}</p>
            <p className="text-blue-600 font-bold">{product.price}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
