import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import api from '../utils/api';
import { CartContext } from '../App';
import { notification } from 'antd';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Excavator Pins',
      desc: 'High-strength alloy steel pins designed for durability.',
      price: 150,
      priceDisplay: '$150',
      delivery: 'Estimated delivery: Apr 30 – May 5',
      images: [p1, p2, p3],
      sizes: ['50mm', '75mm', '100mm'],
      type: 'pins'
    },
    {
      id: 2,
      name: 'Dozer Bushings',
      desc: 'Premium quality bushings engineered for optimal performance.',
      price: 200,
      priceDisplay: '$200',
      delivery: 'Estimated delivery: May 1 – May 6',
      images: [p2, p1, p3],
      sizes: ['Standard', 'Custom'],
      type: 'bushings'
    },
    {
      id: 3,
      name: 'Custom Parts',
      desc: 'Specialized components tailored to your exact specifications.',
      price: 0,
      priceDisplay: 'Custom Quote',
      delivery: 'Contact us for delivery time.',
      images: [p3, p1, p2],
      sizes: [],
      type: 'custom'
    },
  ];

  const product = products.find((item) => item.id === parseInt(id, 10));

  const syncCartWithBackend = async (cart, isBuyNow = false) => {
    try {
      const endpoint = isBuyNow ? 'buy-now' : 'cart';
      await api.post(`http://127.0.0.1:8000/${endpoint}`, { items: cart });
    } catch (error) {
      console.error('Failed to sync cart with backend', error);
    }
  };

  const handleAddToCart = () => {
    if (product.price === 0) {
      alert('Please contact us for a custom quote before adding this item to the cart.');
      return;
    }

    if (product.sizes.length > 0 && !selectedSize) {
      notification.error({
        message: 'Size Required',
        description: 'Please select a size before adding to cart.',
        duration: 2,
      });
      return;
    }

    const existingIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.size === selectedSize
    );

    let updatedCart;
    if (existingIndex >= 0) {
      updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0],
          size: selectedSize,
        },
      ];
    }
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    syncCartWithBackend(updatedCart, false);

    notification.success({
      message: 'Added to Cart',
      description: `${product.name}${selectedSize ? ` (${selectedSize})` : ''} has been added to your cart.`,
      duration: 2,
    });
  };

  const handleBuyNow = () => {
    if (product.price === 0) {
      alert('Please contact us for a custom quote before buying this item.');
      return;
    }

    if (product.sizes.length > 0 && !selectedSize) {
      notification.error({
        message: 'Size Required',
        description: 'Please select a size before proceeding to buy.',
        duration: 2,
      });
      return;
    }

    const buyNowItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      size: selectedSize,
    };

    // Create a separate buy now cart in localStorage
    localStorage.setItem('buyNowCart', JSON.stringify([buyNowItem]));
    syncCartWithBackend([buyNowItem], true);

    // Navigate to the buy now cart page
    navigate('/cart');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <Navbar />
        <h2 className="text-2xl font-bold mt-10">Product Not Found</h2>
        <Link to="/products" className="mt-4 text-blue-600 underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="flex justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full max-w-md h-80 object-cover rounded-lg"
            />
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-gray-700">{product.desc}</p>
            <p className="text-2xl font-bold text-blue-600">{product.priceDisplay}</p>
            <p className="text-gray-600">{product.delivery}</p>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Size:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedSize === size
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons (Add to Cart, Buy Now) */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
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
                  <p className="text-blue-600 font-bold">{relatedProduct.priceDisplay}</p>
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