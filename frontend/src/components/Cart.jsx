import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cart = () => {
  const navigate = useNavigate();
  const [buyNowItem, setBuyNowItem] = useState(null);

  useEffect(() => {
    const loadCart = () => {
      const buyNowCart = JSON.parse(localStorage.getItem("buyNowCart"));
      
      if (buyNowCart && buyNowCart.length > 0) {
        const item = buyNowCart[0];
        // Ensure all required fields are present
        const completeItem = {
          ...item,
          quantity: item.quantity || 1,
          size: item.size || (item.availableSizes?.length > 0 ? 'Not selected' : null),
          price: item.price || 0
        };
        setBuyNowItem(completeItem);
      }
    };

    loadCart();
    window.addEventListener('storage', loadCart); // Listen for changes in other tabs

    return () => {
      window.removeEventListener('storage', loadCart);
    };
  }, []);

  const handleQuantityChange = (type) => {
    if (!buyNowItem) return;

    const updatedQuantity = type === "increase" 
      ? buyNowItem.quantity + 1 
      : Math.max(1, buyNowItem.quantity - 1);

    const updatedItem = { 
      ...buyNowItem, 
      quantity: updatedQuantity 
    };
    
    setBuyNowItem(updatedItem);
    localStorage.setItem("buyNowCart", JSON.stringify([updatedItem]));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-6 py-10 pt-16">
        <h2 className="text-3xl font-bold mb-8">Your Order</h2>

        {buyNowItem ? (
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <img
                src={buyNowItem.image}
                alt={buyNowItem.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-black">{buyNowItem.name}</h3>
              
              {buyNowItem.size && (
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Size:</span> {buyNowItem.size}
                </p>
              )}
              
              <p className="text-blue-600 font-bold mt-2 text-xl">
                ${(buyNowItem.price * buyNowItem.quantity).toFixed(2)}
              </p>
              
              <div className="flex items-center space-x-4 mt-4">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="font-bold text-lg w-8 text-center">
                  {buyNowItem.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="mt-6 md:mt-0 md:ml-auto">
              <button
                onClick={handleCheckout}
                className="w-full md:w-48 bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No items in your order</p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Products
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;