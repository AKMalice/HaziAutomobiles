import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartContext } from '../App';

const CartItems = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setItems(cartItems);
    } else {
      const stored = localStorage.getItem('cartItems');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    }
  }, [cartItems]);

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity < 1) return; // prevent 0 or negative quantities
    const updated = items.map(item =>
      item.id === id && item.size === size ? { ...item, quantity: newQuantity } : item
    );
    setItems(updated);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const handleRemoveItem = (id, size) => {
    const updated = items.filter(item => !(item.id === id && item.size === size));
    setItems(updated);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-6">Your Cart is Empty</h2>
          <Link
            to="/products"
            className="text-blue-600 font-semibold hover:underline"
          >
            Browse Products
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8">Your Cart Items</h2>

        <div className="space-y-6">
          {items.map((item) => (
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
                <label htmlFor={`quantity-${item.id}-${item.size}`} className="sr-only">
                  Quantity
                </label>
                <input
                  id={`quantity-${item.id}-${item.size}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, item.size, parseInt(e.target.value, 10))
                  }
                  className="w-16 p-2 border rounded-lg text-center"
                />
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
