import React from 'react';

const OrderHistory = () => {
  const orders = [
    { id: 1, date: '2025-04-20', total: '$50.00', status: 'Delivered' },
    { id: 2, date: '2025-04-15', total: '$30.00', status: 'In Transit' },
    { id: 3, date: '2025-04-10', total: '$20.00', status: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Order History</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">{order.total}</td>
                  <td className="p-4">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
