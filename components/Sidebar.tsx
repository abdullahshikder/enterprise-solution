
import React from 'react';
import { View } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems: { label: string; view: View; icon: React.ReactNode }[] = [
    { label: 'Dashboard', view: 'DASHBOARD', icon: <i className="fa-solid fa-chart-line"></i> },
    { label: 'Orders', view: 'ORDERS', icon: <Icons.Orders /> },
    { label: 'Products', view: 'PRODUCTS', icon: <Icons.Products /> },
    { label: 'My Websites', view: 'WEBSITES', icon: <Icons.MyWebsites /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 invisible md:visible">
        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Navigation</span>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = currentView === item.view || 
            (item.view === 'PRODUCTS' && (currentView === 'INVENTORY' || currentView === 'PRODUCT_DETAILS')) ||
            (currentView === 'ORDER_DETAILS' && item.view === 'ORDERS');
            
          return (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-red-50 text-red-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={`w-5 text-center ${isActive ? 'text-red-600' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">Help & Support</div>
          <button className="w-full text-left text-xs text-gray-600 hover:text-red-600 mb-2 flex items-center gap-2">
            <i className="fa-solid fa-circle-question"></i> Documentation
          </button>
          <button className="w-full text-left text-xs text-gray-600 hover:text-red-600 flex items-center gap-2">
            <i className="fa-solid fa-headset"></i> Contact Support
          </button>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
          <Icons.Logout />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
