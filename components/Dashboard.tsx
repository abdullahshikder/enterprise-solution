
import React from 'react';
import { Order, View } from '../types';

interface DashboardProps {
  orders: Order[];
  setView: (v: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ orders, setView }) => {
  const stats = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    inTransit: orders.filter(o => o.status === 'IN_TRANSIT').length,
    delivered: orders.filter(o => o.status === 'DELIVERED').length,
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Good Morning, Shikder!</h1>
        <div className="flex gap-2">
           <button onClick={() => setView('WEBSITES')} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700">
             <i className="fa-solid fa-plus mr-2"></i> Create Website
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div onClick={() => setView('ORDERS')} className="cursor-pointer bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="text-gray-500 text-sm font-medium mb-1">All Orders</div>
          <div className="flex items-center gap-4">
             <div className="text-3xl font-bold text-gray-900">{stats.all}</div>
             <i className="fa-solid fa-receipt text-indigo-500 text-xl"></i>
          </div>
        </div>
        <div onClick={() => setView('ORDERS')} className="cursor-pointer bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="text-gray-500 text-sm font-medium mb-1">Pending</div>
          <div className="flex items-center gap-4">
             <div className="text-3xl font-bold text-gray-900">{stats.pending}</div>
             <i className="fa-solid fa-clock text-orange-500 text-xl"></i>
          </div>
        </div>
        <div onClick={() => setView('ORDERS')} className="cursor-pointer bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="text-gray-500 text-sm font-medium mb-1">In Transit</div>
          <div className="flex items-center gap-4">
             <div className="text-3xl font-bold text-gray-900">{stats.inTransit}</div>
             <i className="fa-solid fa-truck-fast text-blue-500 text-xl"></i>
          </div>
        </div>
        <div onClick={() => setView('ORDERS')} className="cursor-pointer bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="text-gray-500 text-sm font-medium mb-1">Delivered</div>
          <div className="flex items-center gap-4">
             <div className="text-3xl font-bold text-gray-900">{stats.delivered}</div>
             <i className="fa-solid fa-circle-check text-green-500 text-xl"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {orders.slice(0, 3).map(order => (
              <div key={order.id} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${order.source === 'PATHAO_SHOP' ? 'bg-red-50' : 'bg-blue-50'}`}>
                    <i className={`fa-solid ${order.source === 'PATHAO_SHOP' ? 'fa-shop text-red-500' : 'fa-globe text-blue-500'} text-xs`}></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold">Order #{order.id}</div>
                      {order.source === 'PATHAO_SHOP' && (
                        <span className="text-[8px] bg-red-50 text-red-600 px-1 py-0.5 rounded border border-red-100 font-black uppercase tracking-tighter">Shop</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{order.customerName} • {order.date}</div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                  order.status === 'ACCEPTED' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                }`}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold mb-4">Unified Inventory Alerts</h3>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg flex items-center gap-4">
              <i className="fa-solid fa-triangle-exclamation text-orange-500 text-xl"></i>
              <div>
                <div className="text-sm font-semibold text-orange-800">Low Stock: Kemei Trimmer</div>
                <div className="text-xs text-orange-700">Only 5 units remaining across all channels. Update stock to prevent overselling.</div>
              </div>
            </div>
            <button onClick={() => setView('PRODUCTS')} className="text-sm text-red-600 font-semibold hover:underline">Manage All Stock →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
