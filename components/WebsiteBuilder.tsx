
import React from 'react';
import { Product } from '../types';

interface WebsiteBuilderProps {
  products: Product[];
}

const WebsiteBuilder: React.FC<WebsiteBuilderProps> = ({ products }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Grow Your Brand with Your Own Website</h1>
        <p className="text-gray-500">Create a professional website that automatically shares your Pathao Enterprise inventory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-6 text-xl">
            <i className="fa-solid fa-plus"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Build New Website</h3>
          <p className="text-gray-500 text-sm mb-6">Create a new storefront in minutes. Select products from your catalog and we'll handle the checkout & delivery integration.</p>
          <button className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700">Start Building</button>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 text-xl">
            <i className="fa-solid fa-link"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Connect Existing Store</h3>
          <p className="text-gray-500 text-sm mb-6">Already have a WooCommerce or Shopify store? Connect it to Pathao Enterprise to sync orders and master stock.</p>
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">Connect Store</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold">Active Storefronts</h3>
          <span className="text-xs text-green-600 font-bold uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> 2 Connected
          </span>
        </div>
        <div className="divide-y divide-gray-100">
           <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded bg-indigo-50 flex items-center justify-center text-indigo-500">
                   <i className="fa-solid fa-store"></i>
                 </div>
                 <div>
                   <div className="font-bold">shikder-grooming.com</div>
                   <div className="text-xs text-gray-400 font-medium">Personal Brand Website • Pro Plan</div>
                 </div>
              </div>
              <button className="text-sm font-semibold text-blue-600 hover:underline">Manage Site</button>
           </div>
           <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center text-red-500">
                   <i className="fa-solid fa-shop"></i>
                 </div>
                 <div>
                   <div className="flex items-center gap-2">
                    <div className="font-bold">Shikder Enterprise</div>
                    <span className="text-[8px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 font-black uppercase tracking-tighter">Shop</span>
                   </div>
                   <div className="text-xs text-gray-400 font-medium">Pathao Marketplace Channel • Default</div>
                 </div>
              </div>
              <div className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded border border-gray-100">Default Channel</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;
