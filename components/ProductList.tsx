
import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onImport: () => void;
  onViewDetails: (id: string) => void;
  onInventoryClick?: (sku: string) => void;
  onPriceClick?: (sku: string) => void;
  onMediaClick?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onImport, 
  onViewDetails, 
  onInventoryClick,
  onPriceClick,
  onMediaClick 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Catalogue</h2>
          <p className="text-sm text-gray-500 font-medium">View and manage your product listings across all channels.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onMediaClick}
            className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-all"
          >
            <i className="fa-solid fa-photo-film text-red-600"></i> Media Gallery
          </button>
          <button 
            onClick={onImport}
            className="bg-[#E1232E] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-cloud-arrow-down"></i> Import Catalog
          </button>
          <button className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm transition-all">
            Add Product <i className="fa-solid fa-circle-plus ml-1 text-green-600"></i>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex gap-4">
           <div className="flex-1 relative">
             <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
             <input 
               type="text" 
               placeholder="Search within products..." 
               className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 font-semibold focus:ring-2 focus:ring-red-100 outline-none text-sm shadow-sm transition-all" 
             />
           </div>
           <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 font-bold outline-none shadow-sm focus:ring-2 focus:ring-red-100">
             <option>Select Category</option>
             <option>Health & Beauty</option>
             <option>Electronics</option>
           </select>
           <div className="flex bg-gray-200/50 rounded-lg p-1 gap-1">
             <button className="px-6 py-1.5 text-xs bg-white rounded-md shadow-sm font-black text-gray-900 transition-all">All</button>
             <button className="px-6 py-1.5 text-xs text-gray-500 font-bold hover:text-gray-900 transition-all">Active</button>
             <button className="px-6 py-1.5 text-xs text-gray-500 font-bold hover:text-gray-900 transition-all">Inactive</button>
           </div>
        </div>

        <div className="overflow-x-auto pathao-scrollbar">
          <table className="w-full text-left text-sm border-collapse min-w-[1100px]">
            <thead className="bg-white border-b text-gray-400 font-black uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-5">ID</th>
                <th className="px-6 py-5">IMAGE</th>
                <th className="px-6 py-5">PRODUCT NAME</th>
                <th className="px-6 py-5">PRICE</th>
                <th className="px-6 py-5 text-center">STATUS</th>
                <th className="px-6 py-5">CREATED DATE</th>
                <th className="px-6 py-5 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {products.map((product, idx) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-6 text-gray-400 font-black">
                    #{idx + 15}
                  </td>
                  <td className="px-6 py-6">
                    <div className="w-14 h-14 rounded-lg border border-gray-200 p-1 bg-white shadow-sm overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="font-black text-gray-900 leading-tight text-base mb-1">{product.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">SKU: {product.sku}</div>
                      <div className="flex gap-1">
                        <span className="text-[8px] bg-red-50 text-red-600 px-1 py-0.5 rounded border border-red-100 font-black uppercase tracking-tighter">Shop</span>
                        <span className="text-[8px] bg-blue-50 text-blue-600 px-1 py-0.5 rounded border border-blue-100 font-black uppercase tracking-tighter">Web</span>
                      </div>
                    </div>
                  </td>
                  <td 
                    className="px-6 py-6 cursor-pointer group hover:bg-yellow-50/30"
                    onClick={() => onPriceClick?.(product.sku)}
                  >
                    <div className="text-[11px] text-gray-400 font-bold">Base: ৳{product.price}</div>
                    <div className="text-sm font-black text-gray-900 mt-0.5 flex items-center gap-1.5">
                      Sale: ৳{product.discountPrice || product.price}
                      <i className="fa-solid fa-pen-to-square text-[10px] text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 rounded-md border border-green-200 font-black tracking-widest uppercase">Active</span>
                  </td>
                  <td className="px-6 py-6 text-gray-500 font-bold text-xs uppercase">
                    {product.createdDate}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-2 items-center min-w-[140px]">
                      <div className="grid grid-cols-2 gap-1.5 w-full">
                        <button 
                          onClick={() => onInventoryClick?.(product.sku)}
                          className="border border-gray-200 bg-white rounded-lg py-2 px-2 text-[9px] font-black text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-sm transition-all relative group"
                        >
                          <i className="fa-solid fa-boxes-stacked text-red-600"></i> Stock
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-[9px] py-1 px-2 rounded whitespace-nowrap z-10">
                            Manage Inventory
                          </div>
                        </button>
                        <button 
                          onClick={() => onPriceClick?.(product.sku)}
                          className="border border-gray-200 bg-white rounded-lg py-2 px-2 text-[9px] font-black text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-sm transition-all relative group"
                        >
                          <i className="fa-solid fa-tag text-yellow-600"></i> Price
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-[9px] py-1 px-2 rounded whitespace-nowrap z-10">
                            Manage Pricing
                          </div>
                        </button>
                      </div>
                      <div className="flex gap-1.5 w-full">
                        <button className="flex-1 border border-gray-200 bg-white rounded-lg py-2 text-[9px] font-black text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-sm transition-all">
                          <i className="fa-solid fa-bolt text-yellow-500"></i> Checkout
                        </button>
                        <button 
                          onClick={() => onViewDetails(product.id)}
                          className="p-2 border border-gray-200 bg-white rounded-lg text-gray-500 hover:text-blue-600 shadow-sm transition-all"
                        >
                          <i className="fa-solid fa-pencil text-xs"></i>
                        </button>
                        <button className="p-2 border border-red-200 bg-white rounded-lg text-red-500 hover:bg-red-50 shadow-sm transition-all">
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
        <span className="text-sm text-gray-400 font-bold uppercase tracking-tighter">Showing 1-{products.length} of {products.length} products</span>
        <div className="flex items-center gap-4">
           <button className="p-1 text-gray-300 hover:text-gray-600 transition-colors"><i className="fa-solid fa-chevron-left"></i></button>
           <button className="w-8 h-8 rounded-md border border-red-600 bg-white text-red-600 font-black text-xs shadow-sm">1</button>
           <button className="p-1 text-gray-300 hover:text-gray-600 transition-colors"><i className="fa-solid fa-chevron-right"></i></button>
           <div className="relative">
             <select className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-9 text-xs bg-white text-gray-900 font-black outline-none shadow-sm cursor-pointer hover:border-gray-300 transition-colors">
               <option>20 / page</option>
             </select>
             <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none"></i>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
