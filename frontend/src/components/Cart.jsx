import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cart = () => {
  const navigate = useNavigate();
  const [buyNowItem, setBuyNowItem] = useState(null);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("buyNowItem"));
    setBuyNowItem(item);
  }, []);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-6 py-10 pt-16">
        <h2 className="text-3xl font-bold mb-8">Your Cart</h2>

        {buyNowItem ? (
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img
                src={buyNowItem.image}
                alt={buyNowItem.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
            </div>

            <div className="flex-grow">
              <h3 className="text-lg font-bold text-black">{buyNowItem.name}</h3>
              <p className="text-gray-500">Size: {buyNowItem.size}</p>
              <p className="text-blue-600 font-bold mt-2">${buyNowItem.price}</p>
              <p className="text-gray-500">Quantity: {buyNowItem.quantity || 1}</p>
            </div>

            <div className="mt-8 md:mt-0">
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No item selected for purchase.</p>
        )}
      </main>
    </div>
  );
};

export default Cart;
