import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTable, usePagination } from 'react-table';
import { Chart, registerables } from 'chart.js';

// Register all the necessary components
Chart.register(...registerables);

const RevenuePage = () => {
  const [yearRevenue, setYearRevenue] = useState(new Date().getFullYear());
  const [yearOrders, setYearOrders] = useState(new Date().getFullYear());

  // Sample data for the cards
  const currentMonthRevenue = 5000; // Example value
  const lastMonthRevenue = 4500; // Example value
  const currentMonthOrders = 150; // Example value
  const lastMonthOrders = 130; // Example value

  // Sample product sales data
  const highestSellingProducts = [
    { id: 1, name: 'Product A', sales: 120 },
    { id: 2, name: 'Product B', sales: 95 },
    { id: 3, name: 'Product C', sales: 80 },
  ];

  // Sample payment history data
  const paymentHistoryData = React.useMemo(
    () => [
      { id: 1, date: '2024-09-01', amount: 100, method: 'Credit Card' },
      { id: 2, date: '2024-09-05', amount: 150, method: 'PayPal' },
      { id: 3, date: '2024-09-10', amount: 200, method: 'Debit Card' },
      { id: 4, date: '2024-09-15', amount: 250, method: 'Bank Transfer' },
      { id: 5, date: '2024-09-20', amount: 300, method: 'Credit Card' },
      { id: 6, date: '2024-09-25', amount: 350, method: 'PayPal' },
      { id: 7, date: '2024-09-30', amount: 400, method: 'Debit Card' },
      // Add more data as needed
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: 'Date', accessor: 'date' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Payment Method', accessor: 'method' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // Pagination
    canPreviousPage,
    canNextPage,
    page,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: paymentHistoryData,
      initialState: { pageIndex: 0 }, // Start on the first page
    },
    usePagination // Use the usePagination hook
  );

  // Sample data for the graphs
  const revenueGraphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 15000, 8000, 20000, 19000, 23000, 18000],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Sales',
        data: [100, 150, 90, 200, 180, 220, 170], // Sample sales data
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  };

  const ordersGraphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Orders',
        data: [120, 160, 110, 210, 190, 250, 180], // Sample orders data
        fill: false,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
      {
        label: 'Sales',
        data: [100, 150, 90, 200, 180, 220, 170], // Sample sales data (same as above)
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  // Options for the graphs
  const graphOptions = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 14, // Adjust x-axis label font size
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14, // Adjust y-axis label font size
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14, // Adjust legend font size
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-800 text-white">
      {/* Top Row Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-600 p-4 rounded-lg">
          <h3>This Month Revenue</h3>
          <p>${currentMonthRevenue}</p>
        </div>
        <div className="bg-blue-600 p-4 rounded-lg">
          <h3>Last Month Revenue</h3>
          <p>${lastMonthRevenue}</p>
        </div>
        <div className="bg-blue-600 p-4 rounded-lg">
          <h3>Orders This Month</h3>
          <p>{currentMonthOrders}</p>
        </div>
        <div className="bg-blue-600 p-4 rounded-lg">
          <h3>Orders Last Month</h3>
          <p>{lastMonthOrders}</p>
        </div>
      </div>

      {/* Graphs and Filters */}
      <div className="flex justify-between mb-8">
        <div className="w-1/2 mr-4">
          <h2 className="text-xl font-bold">Revenue and Sales Over Time</h2>
          <select
            value={yearRevenue}
            onChange={(e) => setYearRevenue(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded mb-2"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
          </select>
          <Line data={revenueGraphData} options={graphOptions} />
        </div>

        <div className="w-1/2 ml-4">
          <h2 className="text-xl font-bold">Orders and Sales Over Time</h2>
          <select
            value={yearOrders}
            onChange={(e) => setYearOrders(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded mb-2"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
          </select>
          <Line data={ordersGraphData} options={graphOptions} />
        </div>
      </div>

      {/* Highest Selling Products */}
      <div className="mb-8">
        <h2 className="text-xl font-bold">Highest Selling Products</h2>
        <ul>
          {highestSellingProducts.map(product => (
            <li key={product.id} className="bg-gray-700 p-3 rounded mb-2">
              {product.name} - {product.sales} sales
            </li>
          ))}
        </ul>
      </div>

      {/* Payment History Table */}
      <div>
        <h2 className="text-xl font-bold">Payment History</h2>
        <table {...getTableProps()} className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="p-3 text-left">{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => { // Use 'page' instead of 'rows'
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-600">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="p-3">{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="bg-blue-600 p-2 rounded-lg disabled:opacity-50"> {'<<'} </button>
          <button onClick={previousPage} disabled={!canPreviousPage} className="bg-blue-600 p-2 rounded-lg disabled:opacity-50"> {'<'} </button>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button onClick={nextPage} disabled={!canNextPage} className="bg-blue-600 p-2 rounded-lg disabled:opacity-50"> {'>'} </button>
          <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage} className="bg-blue-600 p-2 rounded-lg disabled:opacity-50"> {'>>'} </button>
        </div>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
          className="bg-gray-700 text-white p-2 rounded mt-4"
        >
          {[5, 10, 20, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RevenuePage;
