import React, { useState } from "react";

const AdminOrders = () => {
  const ordersData = [
    { id: 1, orderId: "ORD001", customer: "John Doe", date: "2025-04-20", status: "Shipped", amount: "$150", address: "123 Main St", contact: "123-456-7890" },
    { id: 2, orderId: "ORD002", customer: "Jane Smith", date: "2025-04-19", status: "Processing", amount: "$250", address: "456 Elm St", contact: "987-654-3210" },
    { id: 3, orderId: "ORD003", customer: "Mike Brown", date: "2025-04-18", status: "Completed", amount: "$350", address: "789 Oak St", contact: "555-123-4567" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const totalPages = Math.ceil(ordersData.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const currentOrders = ordersData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-[90%] mx-auto font-sans">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Orders</h2>
      {selectedOrder ? (
        <div>
          <button
            className="mb-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 shadow-md transition duration-300"
            onClick={() => setSelectedOrder(null)}
          >
            Back to Orders
          </button>
          <h3 className="text-lg font-bold mb-4">Order Details</h3>
          <div className="border border-gray-300 p-6 rounded-lg bg-white shadow-lg">
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Amount:</strong> {selectedOrder.amount}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Contact:</strong> {selectedOrder.contact}</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden">
            <h3 className="text-xl font-bold p-4 bg-gray-100 text-gray-800 border-b border-gray-200">
              Orders Overview
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                    <th className="py-3 px-6 text-left border-b border-gray-300">S.No</th>
                    <th className="py-3 px-6 text-left border-b border-gray-300">Order ID</th>
                    <th className="py-3 px-6 text-left border-b border-gray-300">Customer</th>
                    <th className="py-3 px-6 text-left border-b border-gray-300">Date</th>
                    <th className="py-3 px-6 text-left border-b border-gray-300">Status</th>
                    <th className="py-3 px-6 text-left border-b border-gray-300">Amount</th>
                    <th className="py-3 px-6 text-left border-b border-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {currentOrders.map((order, index) => (
                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{(currentPage - 1) * ordersPerPage + index + 1}</td>
                      <td className="py-3 px-6 text-left">{order.orderId}</td>
                      <td className="py-3 px-6 text-left">{order.customer}</td>
                      <td className="py-3 px-6 text-left">{order.date}</td>
                      <td className="py-3 px-6 text-left">{order.status}</td>
                      <td className="py-3 px-6 text-left">{order.amount}</td>
                      <td className="py-3 px-6 text-left">
                        <button
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                          onClick={() => handleOrderClick(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages).keys()].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg shadow-sm ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
