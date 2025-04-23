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
} from "recharts";

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
        <div className="flex flex-col">
            {/* Page Heading */}
            <header className="">
                <h2 className="text-3xl font-bold">Admin Dashboard</h2>
            </header>

            {/* Main Content */}
            <main className="p-4">
                {/* Sales Report */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Sales Overview</h3>
                        <div>
                            <button
                                className={`px-4 py-2 mr-2 ${reportType === 'Monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-200'} rounded-md`}
                                onClick={() => setReportType('Monthly')}
                            >
                                Monthly
                            </button>
                            <button
                                className={`px-4 py-2 ${reportType === 'Yearly' ? 'bg-indigo-600 text-white' : 'bg-gray-200'} rounded-md`}
                                onClick={() => setReportType('Yearly')}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={reportType === 'Monthly' ? monthlyData : yearlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </section>

                {/* Recent Orders */}
                <section>
                    <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">S.No</th>
                                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                                <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                                <th className="border border-gray-300 px-4 py-2">Date Ordered</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.orderId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.customer}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
