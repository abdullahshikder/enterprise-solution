
import React from 'react';
import { Order, OrderStatus } from '../types';

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onBack, onUpdateStatus }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-600 font-semibold hover:text-gray-900">
          <i className="fa-solid fa-arrow-left"></i> Order Details: #{order.id}
        </button>
        <div className="flex gap-3">
           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Download Courier Invoice</button>
           <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Download Order Invoice</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <h3 className="font-bold border-b pb-2">Order Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Order Id:</span> <span className="font-semibold">#{order.id}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">Status:</span> 
                <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
                  order.status === 'ACCEPTED' ? 'bg-cyan-50 text-cyan-600' : 'bg-orange-50 text-orange-600'
                }`}>{order.status}</span>
              </div>
              <div className="flex justify-between"><span className="text-gray-500">No. of Items:</span> <span>{order.items.length}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Order Time:</span> <span>{order.date}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Source:</span> 
                <span className="flex items-center gap-1 font-semibold">{order.source.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
             <h3 className="font-bold border-b pb-2 mb-4">Timeline</h3>
             <div className="space-y-4">
               <div className="flex gap-3">
                 <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[10px] text-white">✓</div>
                 <div>
                   <div className="text-xs font-bold">New Order</div>
                   <div className="text-[10px] text-gray-400">30/01/2026 11:38 AM</div>
                 </div>
               </div>
               <div className="flex gap-3">
                 <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-white">2</div>
                 <div>
                   <div className="text-xs font-bold text-gray-400">Processing</div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: Buyer & Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold border-b pb-2 mb-4">Buyer Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500 block mb-1">Customer Name:</span> <span className="font-semibold">{order.customerName}</span></div>
              <div><span className="text-gray-500 block mb-1">Phone No.:</span> <span className="font-semibold">{order.customerPhone}</span></div>
              <div className="col-span-2"><span className="text-gray-500 block mb-1">Billing Address:</span> <span className="text-gray-700">4/A, Rustam Tower, Dhaka, Bangladesh</span></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 overflow-hidden">
            <h3 className="font-bold border-b pb-2 mb-4">Ordered Items</h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 border rounded-lg p-4 bg-gray-50">
                   <img src={`https://picsum.photos/seed/${item.productId}/100/100`} alt="" className="w-16 h-16 rounded object-cover bg-white" />
                   <div className="flex-1">
                      <div className="font-bold text-gray-900">{item.productName}</div>
                      <div className="text-xs text-gray-500 mt-1">This professional hair trimmer is perfect for detailed grooming.</div>
                      <div className="text-[10px] mt-2 font-semibold">Option 1: <span className="text-gray-400">Multicolor</span></div>
                   </div>
                   <div className="text-right">
                      <div className="text-xs text-gray-400 line-through">৳{item.price * 1.5}</div>
                      <div className="font-bold">৳{item.price} x {item.quantity} = ৳{item.price * item.quantity}</div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold border-b pb-2 mb-4 text-sm">Payment Information</h3>
            <div className="space-y-2 text-sm">
               <div className="flex justify-between"><span>Payment Method:</span> <span className="font-bold">Cash On Delivery</span></div>
               <div className="flex justify-between text-gray-500"><span>Items Total</span> <span>৳1,200</span></div>
               <div className="flex justify-between text-red-500"><span>Store Discount</span> <span>-৳550</span></div>
               <div className="flex justify-between font-bold pt-2 border-t"><span>Grand Total</span> <span>৳{order.total}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
