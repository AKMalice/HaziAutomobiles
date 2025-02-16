import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';

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
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar Included */}
      <Navbar />

      {/* Add padding-top to push content below the fixed Navbar */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h2 className="text-4xl font-bold text-center mb-8">Our Products</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card bg-white hover:shadow-xl border border-primary transition-all duration-300">
              <figure className="px-4 pt-4">
                <img src={product.img} alt={product.name} className="rounded-xl w-full h-50 object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="text-gray-600">{product.desc}</p>
                <p className="text-lg font-bold text-primary">{product.price}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary" onClick={() => navigate(`/product/${product.id}`)}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
