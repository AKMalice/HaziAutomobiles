import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const AdminRevenue = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');
    const revenueData = {
        monthly: [
            { month: 'January', revenue: 5000 },
            { month: 'February', revenue: 4500 },
            { month: 'March', revenue: 6000 },
        ],
        yearly: [
            { year: '2023', revenue: 75000 },
            { year: '2024', revenue: 90000 },
        ],
    };

    const handleDownload = () => {
        const data = timeFrame === 'monthly' ? revenueData.monthly : revenueData.yearly;
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Revenue Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `revenue_${timeFrame}.xlsx`);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-[90%] mx-auto">
            <h2 className="text-3xl font-bold mb-6">Admin Revenue</h2>

            {/* Time Frame Selection */}
            <div className="mb-6 flex items-center space-x-4">
                <button
                    className={`px-4 py-2 rounded ${timeFrame === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setTimeFrame('monthly')}
                >
                    Monthly
                </button>
                <button
                    className={`px-4 py-2 rounded ${timeFrame === 'yearly' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setTimeFrame('yearly')}
                >
                    Yearly
                </button>
            </div>

            {/* Revenue Details */}
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-4">Revenue Overview ({timeFrame === 'monthly' ? 'Monthly' : 'Yearly'})</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">{timeFrame === 'monthly' ? 'Month' : 'Year'}</th>
                            <th className="border border-gray-300 px-4 py-2">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(timeFrame === 'monthly' ? revenueData.monthly : revenueData.yearly).map((data, index) => (
                            <tr key={index} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">
                                    {timeFrame === 'monthly' ? data.month : data.year}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">${data.revenue.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Download Button */}
            <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Download Revenue Data
            </button>
        </div>
    );
};

export default AdminRevenue;
