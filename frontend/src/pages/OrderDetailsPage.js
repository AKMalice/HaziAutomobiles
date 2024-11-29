// import React from 'react';
// import { useParams } from 'react-router-dom';

// // Sample order data
// const initialOrders = [
//   { id: 1, customerName: 'John Doe', date: '2023-05-10', status: 'Completed', product: 'Wireless Headphones', details: 'Wireless headphones with noise cancellation.' },
//   { id: 2, customerName: 'Jane Smith', date: '2023-05-11', status: 'Ongoing', product: 'Smartwatch', details: 'Smartwatch with fitness tracking and notifications.' },
//   { id: 3, customerName: 'Bob Johnson', date: '2023-05-11', status: 'Completed', product: 'Laptop', details: 'High-performance laptop with 16GB RAM and 512GB SSD.' },
//   { id: 4, customerName: 'Alice Brown', date: '2023-05-12', status: 'Ongoing', product: 'Smartphone', details: 'Latest smartphone with 128GB storage and 5G support.' },
//   { id: 5, customerName: 'Charlie Wilson', date: '2023-05-12', status: 'Pending', product: 'Tablet', details: '10-inch tablet with 64GB storage and stylus support.' },
// ];

// const OrderDetailsPage = () => {
//   const { orderId } = useParams();

//   // Find the order by ID
//   const order = initialOrders.find((order) => order.id === parseInt(orderId));

//   if (!order) {
//     return <div className="text-white">Order not found.</div>;
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-8">
//       <div className="bg-gray-800 p-10 rounded-lg shadow-2xl max-w-3xl w-full text-center">
//         <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
//           Order Receipt
//         </h2>

//         <div className="border-t border-gray-600 pt-6">
//           <h3 className="text-2xl font-semibold mb-4">{`Order #${order.id}`}</h3>

//           {/* Customer and Order Information */}
//           <div className="grid grid-cols-2 gap-4 mb-8 text-left">
//             <div>
//               <p className="mb-2 text-lg">
//                 <strong>Customer Name:</strong> {order.customerName}
//               </p>
//               <p className="mb-2 text-lg">
//                 <strong>Product:</strong> {order.product}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-lg">
//                 <strong>Date Placed:</strong> {order.date}
//               </p>
//               <p className="mb-2 text-lg">
//                 <strong>Status:</strong> {order.status}
//               </p>
//             </div>
//           </div>

//           {/* Order Details */}
//           <div className="bg-gray-700 p-4 rounded-lg mb-8">
//             <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
//             <p className="text-lg mb-2">
//               <strong>Product Details:</strong> {order.details}
//             </p>
//           </div>

//           {/* Invoice-like Footer */}
//           <div className="border-t border-gray-600 pt-4 mt-8">
//             <p className="text-gray-400 text-sm">
//               This is an official receipt for the purchase of the product
//               mentioned above. For any inquiries, please contact our support team.
//             </p>
//             <p className="text-gray-400 text-sm mt-4">Thank you for shopping with us!</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsPage;
import React from 'react';
import { useParams } from 'react-router-dom';
import { Package, Calendar, User, CreditCard, Truck } from 'lucide-react';

// Sample order data (expanded with more details)
const initialOrders = [
  {
    id: 1,
    customerName: 'John Doe',
    email: 'john.doe@example.com',
    date: '2023-05-10',
    status: 'Completed',
    product: 'Wireless Headphones',
    details: 'Wireless headphones with noise cancellation.',
    price: 199.99,
    quantity: 1,
    shipping: 9.99,
    tax: 20.00,
    total: 229.98,
    paymentMethod: 'Credit Card (**** 1234)',
    shippingAddress: '123 Main St, Anytown, AN 12345',
  },
  // ... other orders ...
];

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const order = initialOrders.find((order) => order.id === parseInt(orderId));

  if (!order) {
    return <div className="text-white text-center">Order not found.</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
          Order Invoice
        </h2>

        <div className="border-b border-gray-700 pb-4 mb-4">
          <h3 className="text-2xl font-semibold mb-2 flex items-center">
            <Package className="mr-2" /> Order #{order.id}
          </h3>
          <p className="text-gray-400 flex items-center">
            <Calendar className="mr-2" /> {order.date}
          </p>
          <p className="text-gray-400 flex items-center mt-1">
            <User className="mr-2" /> {order.customerName}
          </p>
          <p className="text-gray-400 flex items-center mt-1">
            {order.email}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2">Product Details</h4>
          <div className="bg-gray-700 p-4 rounded">
            <p className="font-medium">{order.product}</p>
            <p className="text-gray-400 text-sm mt-1">{order.details}</p>
            <div className="flex justify-between mt-2">
              <span>Quantity:</span>
              <span>{order.quantity}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Price:</span>
              <span>${order.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2">Order Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${order.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-700">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xl font-semibold mb-2 flex items-center">
              <CreditCard className="mr-2" /> Payment
            </h4>
            <p className="text-gray-400">{order.paymentMethod}</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2 flex items-center">
              <Truck className="mr-2" /> Shipping
            </h4>
            <p className="text-gray-400">{order.shippingAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;