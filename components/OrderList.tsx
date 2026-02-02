
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Icons } from '../constants';

interface OrderListProps {
  orders: Order[];
  onViewDetails: (id: string) => void;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onViewDetails, onUpdateStatus }) => {
  const [filter, setFilter] = useState('');

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(filter.toLowerCase()) || 
    o.customerName.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
      case 'ACCEPTED': return 'bg-cyan-50 text-cyan-600 border-cyan-100';
      case 'PENDING': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'DELIVERED': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">Orders</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
            <Icons.Export /> Export
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[300px]">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search by customer name or order ID..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-100 shadow-sm transition-all"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-100 shadow-sm outline-none">
          <option>Filter by Status</option>
          <option>Pending</option>
          <option>Accepted</option>
          <option>Delivered</option>
        </select>
        <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm text-gray-700 font-semibold hover:bg-gray-50 shadow-sm">
           <Icons.Reset /> Reset
        </button>
      </div>

      <div className="overflow-x-auto pathao-scrollbar">
        <table className="w-full text-left text-sm min-w-[1000px]">
          <thead className="bg-white text-gray-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-100">
            <tr>
              <th className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300 bg-white" /></th>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Courier Status</th>
              <th className="px-6 py-4">Recipient Info</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Fee</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onViewDetails(order.id)}>
                <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-gray-300 bg-white" /></td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-semibold text-gray-900 flex items-center gap-1">
                      {order.id} <i className="fa-regular fa-copy text-xs text-blue-500 cursor-pointer"></i>
                    </span>
                    <div className="flex gap-2 items-center">
                       <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${getStatusColor(order.status)} uppercase tracking-tighter`}>
                         {order.status}
                       </span>
                       <span className={`text-[9px] px-1.5 py-0.5 rounded border font-black flex items-center gap-1 uppercase tracking-tighter ${
                         order.source === 'PATHAO_SHOP' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                       }`}>
                         <i className={`fa-solid ${order.source === 'PATHAO_SHOP' ? 'fa-shop' : 'fa-globe'}`}></i>
                         {order.source === 'PATHAO_SHOP' ? 'Shop' : 'Website'}
                       </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                   <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 font-medium">Pathao Courier</span>
                </td>
                <td className="px-6 py-5">
                  <div className="font-bold text-gray-900">{order.customerName}</div>
                  <div className="text-gray-500 text-xs">{order.customerPhone}</div>
                  <span className="text-[10px] bg-red-50 text-red-500 px-1 rounded font-bold uppercase tracking-tighter">Unpaid</span>
                </td>
                <td className="px-6 py-5 text-gray-500 font-medium">{order.date}</td>
                <td className="px-6 py-5 font-black text-gray-900">৳{order.total}</td>
                <td className="px-6 py-5 text-gray-400">-</td>
                <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-green-600" title="Complete Order">
                      <i className="fa-solid fa-circle-check text-lg"></i>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600" title="Print Invoice">
                      <i className="fa-solid fa-print text-lg"></i>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600" title="Cancel">
                      <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-white">
        <span className="text-sm text-gray-500 font-medium">Showing 1-{filteredOrders.length} of {orders.length} orders</span>
        <div className="flex items-center gap-2">
           <button className="p-1 text-gray-400 hover:text-gray-700 transition-colors"><i className="fa-solid fa-chevron-left"></i></button>
           <button className="w-8 h-8 rounded border border-red-600 bg-white text-red-600 font-bold shadow-sm">1</button>
           <button className="p-1 text-gray-400 hover:text-gray-700 transition-colors"><i className="fa-solid fa-chevron-right"></i></button>
           <div className="relative ml-4">
             <select className="appearance-none border border-gray-200 rounded px-3 py-1.5 pr-8 text-sm bg-white text-gray-900 font-medium outline-none shadow-sm">
               <option>20 / page</option>
             </select>
             <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none"></i>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
