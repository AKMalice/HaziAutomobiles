import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingCart, DollarSign, Package, TrendingUp, Users, ClipboardList } from 'lucide-react';

const data = [
  { name: 'Jan', sales: 4000, revenue: 2400, customers: 200, orders: 500 },
  { name: 'Feb', sales: 3000, revenue: 1398, customers: 180, orders: 400 },
  { name: 'Mar', sales: 2000, revenue: 9800, customers: 220, orders: 700 },
  { name: 'Apr', sales: 2780, revenue: 3908, customers: 250, orders: 600 },
  { name: 'May', sales: 1890, revenue: 4800, customers: 270, orders: 550 },
  { name: 'Jun', sales: 2390, revenue: 3800, customers: 210, orders: 500 },
];

const OverviewCard = ({ title, value, icon: Icon, color }) => (
  <div className={`p-6 rounded-xl shadow-lg backdrop-blur-lg bg-opacity-30 border border-gray-700 transform transition-all duration-300 hover:scale-105 ${color}`}>
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
        Dashboard Overview
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <OverviewCard title="New Orders" value="1,520" icon={ShoppingCart} color="border-l-4 border-blue-500" />
        <OverviewCard title="Revenue" value="$23,950" icon={DollarSign} color="border-l-4 border-green-500" />
        <OverviewCard title="Active Products" value="187" icon={Package} color="border-l-4 border-purple-500" />
        <OverviewCard title="Total Customers" value="850" icon={Users} color="border-l-4 border-pink-500" />
        <OverviewCard title="Top Product Sales" value="25,000" icon={TrendingUp} color="border-l-4 border-red-500" />
        <OverviewCard title="Recent Orders" value="342" icon={ClipboardList} color="border-l-4 border-yellow-500" />
      </div>

      {/* Charts and Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2c" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Revenue Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2c" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-400">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-6">Oct 5, 2024</td>
                <td className="py-3 px-6">John Doe</td>
                <td className="py-3 px-6">$120</td>
                <td className="py-3 px-6 text-green-400">Completed</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-6">Oct 4, 2024</td>
                <td className="py-3 px-6">Jane Smith</td>
                <td className="py-3 px-6">$250</td>
                <td className="py-3 px-6 text-yellow-400">Pending</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-6">Oct 3, 2024</td>
                <td className="py-3 px-6">Michael Scott</td>
                <td className="py-3 px-6">$320</td>
                <td className="py-3 px-6 text-red-400">Failed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
