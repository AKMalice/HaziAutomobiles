import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Excavator Pins",
      desc: "High-strength alloy steel pins designed for durability.",
      price: "$150",
      sizes: ["50 mm", "75 mm", "100 mm"],
      delivery: "Estimated delivery: Apr 30 – May 5",
      images: [p1, p2, p3],
    },
    {
      id: 2,
      name: "Dozer Bushings",
      desc: "Premium quality bushings engineered for optimal performance.",
      price: "$200",
      sizes: ["Standard", "Custom"],
      delivery: "Estimated delivery: May 1 – May 6",
      images: [p2, p1, p3],
    },
    {
      id: 3,
      name: "Custom Parts",
      desc: "Specialized components tailored to your exact specifications.",
      price: "Custom Quote",
      delivery: "Contact us for delivery time.",
      images: [p3, p1, p2],
    },
  ];

  const product = products.find((item) => item.id === parseInt(id));

  const handleBuyNow = () => {
    navigate('/cart', { state: { product } });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-gray-700">{product.desc}</p>
            {product.sizes && (
              <div>
                <h3 className="text-lg font-semibold">Size:</h3>
                <select className="mt-2 p-2 border rounded-lg w-full md:w-1/2">
                  {product.sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <p className="text-2xl font-bold text-blue-600">{product.price}</p>
            <p className="text-gray-600">{product.delivery}</p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((item) => item.id !== product.id)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="h-48 w-full object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-bold">{relatedProduct.name}</h4>
                  <p className="text-gray-700 mb-2">{relatedProduct.desc}</p>
                  <p className="text-blue-600 font-bold">{relatedProduct.price}</p>
                  <Link
                    to={`/product/${relatedProduct.id}`}
                    className="mt-4 block text-center text-blue-600 font-semibold hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
