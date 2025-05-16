import React from 'react';

const OrderHistory = () => {
  const orders = [
    { id: 1, date: '2025-04-20', total: '$50.00', status: 'Delivered' },
    { id: 2, date: '2025-04-15', total: '$30.00', status: 'In Transit' },
    { id: 3, date: '2025-04-10', total: '$20.00', status: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Order History</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b text-gray-600 text-sm hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">{order.total}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-600'
                          : order.status === 'In Transit'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <div className="text-sm font-bold text-gray-700">Order ID: {order.id}</div>
                <div className="text-sm text-gray-600">Date: {order.date}</div>
                <div className="text-sm text-gray-600">Total: {order.total}</div>
                <div className="mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-600'
                        : order.status === 'In Transit'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
