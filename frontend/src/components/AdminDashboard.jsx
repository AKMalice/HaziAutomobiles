import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AdminDashboard = () => {
  const [reportType, setReportType] = useState('Monthly');

  const monthlyData = [
    { name: 'Jan', Sales: 4000 },
    { name: 'Feb', Sales: 3000 },
    { name: 'Mar', Sales: 5000 },
    { name: 'Apr', Sales: 4000 },
  ];

  const yearlyData = [
    { name: '2020', Sales: 12000 },
    { name: '2021', Sales: 15000 },
    { name: '2022', Sales: 18000 },
    { name: '2023', Sales: 20000 },
  ];

  const orders = [
    { id: 1, orderId: 'ORD001', customer: 'John Doe', date: '2025-04-20', status: 'Shipped', amount: '$150' },
    { id: 2, orderId: 'ORD002', customer: 'Jane Smith', date: '2025-04-19', status: 'Processing', amount: '$250' },
    { id: 3, orderId: 'ORD003', customer: 'Mike Brown', date: '2025-04-18', status: 'Completed', amount: '$350' },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-[90%] mx-auto font-sans bg-white min-h-screen">
      {/* Page Heading */}
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      </header>

      {/* Sales Report */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Sales Overview</h3>
          <div>
            <button
              className={`px-4 py-2 mr-2 rounded-lg shadow-sm ${
                reportType === 'Monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setReportType('Monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-lg shadow-sm ${
                reportType === 'Yearly' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setReportType('Yearly')}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportType === 'Monthly' ? monthlyData : yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Sales" stroke="#4f46e5" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent Orders */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h3>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="py-3 px-6 text-left border-b border-gray-300">S.No</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Order ID</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Customer Name</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Date Ordered</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Status</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Amount</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{order.id}</td>
                  <td className="py-3 px-6 text-left">{order.orderId}</td>
                  <td className="py-3 px-6 text-left">{order.customer}</td>
                  <td className="py-3 px-6 text-left">{order.date}</td>
                  <td className="py-3 px-6 text-left">{order.status}</td>
                  <td className="py-3 px-6 text-left">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
