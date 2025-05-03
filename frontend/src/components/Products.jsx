import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FiSearch } from "react-icons/fi"; // Import search icon from react-icons
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";

const Products = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Excavator Pins",
      desc: "High-strength alloy steel pins designed for durability.",
      price: "$150",
      img: p1,
    },
    {
      id: 2,
      name: "Dozer Bushings",
      desc: "Premium quality bushings engineered for optimal performance.",
      price: "$200",
      img: p2,
    },
    {
      id: 3,
      name: "Custom Parts",
      desc: "Specialized components tailored to your exact specifications.",
      price: "Custom Quote",
      img: p3,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Handle search logic
  const handleSearch = () => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar Included */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <h2 className="text-4xl font-bold text-center mb-8">Our Products</h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full md:w-1/2 flex">
            <input
              type="text"
              placeholder="Search products by name or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress} // Trigger search on Enter key press
            />
            <button
              className="px-4 bg-blue-600 text-white rounded-r-lg flex items-center justify-center hover:bg-blue-700"
              onClick={handleSearch}
            >
              <FiSearch className="text-xl" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white hover:shadow-xl border border-gray-300 rounded-lg transition-all duration-300"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="rounded-xl w-full h-50 object-cover"
                  />
                </figure>
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.desc}</p>
                  <p className="text-lg font-bold text-blue-600">{product.price}</p>
                  <div className="mt-4">
                    <button
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
