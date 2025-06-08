import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AdminRevenue = () => {
  const [timeFrame, setTimeFrame] = useState("monthly");

  const revenueData = {
    monthly: [
      { month: "January", revenue: 5000 },
      { month: "February", revenue: 4500 },
      { month: "March", revenue: 6000 },
      { month: "April", revenue: 5500 },
      { month: "May", revenue: 6200 },
      { month: "June", revenue: 5800 },
      { month: "July", revenue: 6500 },
      { month: "August", revenue: 6100 },
      { month: "September", revenue: 5900 },
      { month: "October", revenue: 6300 },
      { month: "November", revenue: 6700 },
      { month: "December", revenue: 7000 },
    ],
    yearly: [
      { year: "2023", revenue: 75000 },
      { year: "2024", revenue: 90000 },
      { year: "2025", revenue: 95000 },
    ],
  };

  const handleDownload = () => {
    try {
      const data = timeFrame === "monthly" ? revenueData.monthly : revenueData.yearly;
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Revenue Data");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, `revenue_${timeFrame}.xlsx`);
    } catch (error) {
      console.error("Error downloading revenue data:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-[90%] mx-auto font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Revenue</h2>
        <button
          onClick={handleDownload}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Download Revenue Data
        </button>
      </div>
      <div className="mb-6 flex items-center space-x-4">
        <button
          className={`px-6 py-2 rounded-lg shadow-sm ${
            timeFrame === "monthly"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setTimeFrame("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-6 py-2 rounded-lg shadow-sm ${
            timeFrame === "yearly"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setTimeFrame("yearly")}
        >
          Yearly
        </button>
      </div>
      <div className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <h3 className="text-xl font-bold p-4 bg-gray-100 text-gray-800 border-b border-gray-200">
          Revenue Overview ({timeFrame === "monthly" ? "Monthly" : "Yearly"})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="py-3 px-6 text-left border-b border-gray-300">
                  {timeFrame === "monthly" ? "Month" : "Year"}
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-300">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {(timeFrame === "monthly" ? revenueData.monthly : revenueData.yearly).map(
                (data, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      {timeFrame === "monthly" ? data.month : data.year}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className="font-medium text-green-600">
                        ${data.revenue.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue;
