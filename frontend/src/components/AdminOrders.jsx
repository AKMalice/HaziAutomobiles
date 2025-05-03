import React, { useState } from 'react';

const AdminOrders = () => {
    const ordersData = [
        { id: 1, orderId: 'ORD001', customer: 'John Doe', date: '2025-04-20', status: 'Shipped', amount: '$150', address: '123 Main St', contact: '123-456-7890' },
        { id: 2, orderId: 'ORD002', customer: 'Jane Smith', date: '2025-04-19', status: 'Processing', amount: '$250', address: '456 Elm St', contact: '987-654-3210' },
        { id: 3, orderId: 'ORD003', customer: 'Mike Brown', date: '2025-04-18', status: 'Completed', amount: '$350', address: '789 Oak St', contact: '555-123-4567' },
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
        <div className="p-4 max-w-[90%] mx-auto">
            <h2 className="text-3xl font-bold mb-6">Admin Orders</h2>

            {selectedOrder ? (
                <div>
                    <button
                        className="mb-4 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={() => setSelectedOrder(null)}
                    >
                        Back to Orders
                    </button>
                    <h3 className="text-lg font-bold mb-4">Order Details</h3>
                    <div className="border border-gray-300 p-4 rounded bg-white shadow-md">
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
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">S.No</th>
                                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                                <th className="border border-gray-300 px-4 py-2">Customer</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Amount</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order, index) => (
                                <tr key={order.id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{(currentPage - 1) * ordersPerPage + index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.orderId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.customer}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.amount}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                            onClick={() => handleOrderClick(order)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-4 space-x-2">
                        {[...Array(totalPages).keys()].map((_, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
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
