import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const navigate = useNavigate();

  // Sample order data
  const initialOrders = [
    { id: 1, customerName: 'John Doe', date: '2023-05-10', status: 'Completed', product: 'Wireless Headphones' },
    { id: 2, customerName: 'Jane Smith', date: '2023-05-11', status: 'Ongoing', product: 'Smartwatch' },
    { id: 3, customerName: 'Bob Johnson', date: '2023-05-11', status: 'Completed', product: 'Laptop' },
    { id: 4, customerName: 'Alice Brown', date: '2023-05-12', status: 'Ongoing', product: 'Smartphone' },
    { id: 5, customerName: 'Charlie Wilson', date: '2023-05-12', status: 'Pending', product: 'Tablet' },
  ];

  const [orders, setOrders] = useState(initialOrders);

  const filteredOrders = orders.filter(order =>
    (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.product.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDate === '' || order.date === selectedDate) &&
    (selectedStatus === '' || order.status === selectedStatus) &&
    (selectedProduct === '' || order.product === selectedProduct)
  );

  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
        Orders
      </h2>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-lg transition-all"
          />
          <Search className="absolute left-4 top-3 text-gray-400" />
        </div>

        {/* Date Filter */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
        />

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Pending">Pending</option>
        </select>

        {/* Product Filter */}
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          <option value="">All Products</option>
          <option value="Wireless Headphones">Wireless Headphones</option>
          <option value="Smartwatch">Smartwatch</option>
          <option value="Laptop">Laptop</option>
          <option value="Smartphone">Smartphone</option>
          <option value="Tablet">Tablet</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Date Placed
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleOrderClick(order.id)}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
