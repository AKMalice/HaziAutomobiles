import React, { useState, useEffect } from 'react';
import { Edit, Trash, Plus, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports'];

const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 50, category: 'Electronics', image: '/api/placeholder/300/200' },
  { id: 2, name: 'Smartphone', price: 699.99, quantity: 30, category: 'Electronics', image: '/api/placeholder/300/200' },
  { id: 3, name: 'T-Shirt', price: 19.99, quantity: 100, category: 'Clothing', image: '/api/placeholder/300/200' },
  { id: 4, name: 'Novel', price: 14.99, quantity: 75, category: 'Books', image: '/api/placeholder/300/200' },
  { id: 5, name: 'Coffee Maker', price: 79.99, quantity: 40, category: 'Home & Kitchen', image: '/api/placeholder/300/200' },
  { id: 6, name: 'Running Shoes', price: 89.99, quantity: 60, category: 'Sports', image: '/api/placeholder/300/200' },
];

const ProductCard = ({ product, onEdit, onDelete }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
  >
    <img src="https://img.freepik.com/free-photo/organic-cosmetic-product-with-dreamy-aesthetic-fresh-background_23-2151382816.jpg" alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
      <p className="text-blue-400 mb-2">${product.price.toFixed(2)}</p>
      <p className="text-gray-400 mb-2">Quantity: {product.quantity}</p>
      <p className="text-gray-400 mb-4">{product.category}</p>
      <div className="flex justify-between">
        <button
          onClick={() => onEdit(product.id)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1 rounded-lg flex items-center transition-all duration-300"
        >
          <Edit className="w-4 h-4 mr-2" /> Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-lg flex items-center transition-all duration-300"
        >
          <Trash className="w-4 h-4 mr-2" /> Delete
        </button>
      </div>
    </div>
  </motion.div>
);

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [quantityRange, setQuantityRange] = useState({ min: '', max: '' });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const filtered = products.filter(product =>
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (priceRange.min === '' || product.price >= parseFloat(priceRange.min)) &&
      (priceRange.max === '' || product.price <= parseFloat(priceRange.max)) &&
      (quantityRange.min === '' || product.quantity >= parseFloat(quantityRange.min)) &&
      (quantityRange.max === '' || product.quantity <= parseFloat(quantityRange.max))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, quantityRange]);

  const handleEdit = (id) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete product:', id);
  };

  const handleAddProduct = () => {
    console.log('Add new product');
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prevRange => ({
      ...prevRange,
      [name]: value
    }));
  };

  const handleQuantityChange = (e) => {
    const { name, value } = e.target;
    setQuantityRange(prevRange => ({
      ...prevRange,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange({ min: '', max: '' });
    setQuantityRange({ min: '', max: '' });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
        Product List
      </h2>

      {/* Categories */}
      <div className="mb-6 flex flex-wrap gap-4">
        {['All', ...categories].map(category => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            } transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Search, Filter, and Add Product */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="w-5 h-5 mr-2" /> Filters
        </motion.button>
        <motion.button
          onClick={handleAddProduct}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5 mr-2" /> Add Product
        </motion.button>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800 p-4 rounded-lg mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="min"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                    className="w-1/2 bg-gray-700 text-white px-2 py-1 rounded"
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="max"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                    className="w-1/2 bg-gray-700 text-white px-2 py-1 rounded"
                    placeholder="Max"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2">Quantity Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="min"
                    value={quantityRange.min}
                    onChange={handleQuantityChange}
                    className="w-1/2 bg-gray-700 text-white px-2 py-1 rounded"
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="max"
                    value={quantityRange.max}
                    onChange={handleQuantityChange}
                    className="w-1/2 bg-gray-700 text-white px-2 py-1 rounded"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="mt-4">
              <motion.button
                onClick={clearFilters}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <AnimatePresence>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500"
          >
            No products found.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductList;
