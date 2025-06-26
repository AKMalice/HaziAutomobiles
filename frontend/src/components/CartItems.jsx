import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartContext } from '../App';

const CartItems = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      const stored = localStorage.getItem('cartItems');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    }
  }, []);

  const handleQuantityChange = (id, size, type) => {
    const updated = cartItems.map(item => {
      if (item.id === id && item.size === size) {
        const newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(newQuantity, 1) }; // Ensure quantity is at least 1
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const handleRemoveItem = (id, size) => {
    const updated = cartItems.filter(item => !(item.id === id && item.size === size));
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-10 pt-16 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-6">Your Cart is Empty</h2>
          <Link to="/products" className="text-blue-600 font-semibold hover:underline">
            Browse Products
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-10 pt-16">
        <h2 className="text-3xl font-bold mb-8">Your Cart Items</h2>

        <div className="space-y-6">
          {cartItems.map(item => (
            <div
              key={`${item.id}-${item.size}`}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6"
            >
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>

              <div className="flex-grow space-y-1">
                <h3 className="text-lg font-bold text-black">{item.name}</h3>
                <p className="text-gray-600">Size: {item.size}</p>
                <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-2">
                {/* Quantity Controls */}
                <button
                  onClick={() => handleQuantityChange(item.id, item.size, 'decrease')}
                  className="px-3 py-1 bg-gray-200 rounded-lg text-lg hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-bold text-lg">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.size, 'increase')}
                  className="px-3 py-1 bg-gray-200 rounded-lg text-lg hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id, item.size)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700"
          >
            Go to Checkout
          </button>
        </div>
      </main>
    </div>
  );
};

export default CartItems;
