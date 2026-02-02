
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface InventoryManagerProps {
  products: Product[];
  onUpdateStock: (id: string, stock: number) => void;
  initialSearch?: string;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ products, onUpdateStock, initialSearch }) => {
  const [search, setSearch] = useState(initialSearch || 'tshirt');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (initialSearch) {
      setSearch(initialSearch);
      const product = products.find(p => p.sku.toLowerCase() === initialSearch.toLowerCase());
      if (product) {
        setExpandedRows(new Set([product.id]));
      }
    } else if (products.length > 0) {
      setExpandedRows(new Set([products[0].id]));
    }
  }, [initialSearch, products]);

  const toggleRow = (id: string) => {
    const next = new Set(expandedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedRows(next);
  };

  const filteredProducts = products.filter(p => 
    p.sku.toLowerCase().includes(search.toLowerCase()) || 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Header Area - White background, Black text */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-red-100 transition-all">
            <i 
              className="fa-solid fa-xmark text-gray-400 cursor-pointer mr-3 hover:text-red-500" 
              onClick={() => setSearch('')}
            ></i>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white text-sm font-semibold w-full outline-none text-gray-900 placeholder-gray-400"
              placeholder="Search by SKU or name..."
            />
          </div>
        </div>
        <button className="bg-[#E1232E] text-white px-8 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-red-700 transition-all shadow-sm">
          <i className="fa-regular fa-floppy-disk text-base"></i>
          Update Inventory
        </button>
      </div>

      {/* Main Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-white text-gray-400 font-bold text-[11px] uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th className="w-16 px-4 py-4"></th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Product/Variant</th>
              <th className="px-6 py-4">Total Stocks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map(p => {
              const isExpanded = expandedRows.has(p.id);
              return (
                <React.Fragment key={p.id}>
                  {/* Parent Row */}
                  <tr 
                    className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${isExpanded ? 'bg-white' : ''}`} 
                    onClick={() => toggleRow(p.id)}
                  >
                    <td className="px-4 py-6 text-center">
                      <div className="inline-flex items-center justify-center w-6 h-6 border border-gray-200 rounded text-gray-400 bg-white shadow-sm">
                        <i className={`fa-solid ${isExpanded ? 'fa-minus' : 'fa-plus'} text-[10px]`}></i>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-semibold text-gray-800 uppercase">{p.sku}</td>
                    <td className="px-6 py-6 text-gray-600 capitalize">Tshirt</td>
                    <td className="px-6 py-6 font-bold text-gray-900 text-base">{p.stock}</td>
                  </tr>

                  {/* Expanded Detail Row - Fully white background */}
                  {isExpanded && (
                    <tr className="bg-white">
                      <td colSpan={4} className="p-0 border-t border-gray-50">
                        <div className="flex">
                          {/* Indentation spacing to match SKU alignment */}
                          <div className="w-[18%]"></div>
                          
                          <div className="flex-1 py-6 px-4">
                            {/* Inner Headers */}
                            <div className="grid grid-cols-2 pb-3 mb-6 border-b border-gray-100">
                               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Warehouse</div>
                               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock</div>
                            </div>

                            {/* Stock Entry List */}
                            <div className="space-y-4">
                              {p.warehouseStocks.map((ws, idx) => (
                                <div key={idx} className="grid grid-cols-2 items-center gap-16 pr-16">
                                  <div className="flex items-center gap-2">
                                    <div className="text-sm font-semibold text-gray-700">{ws.name}</div>
                                    {ws.name === 'Pathao Shop' && (
                                      <span className="text-[8px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 font-black uppercase tracking-tighter">Shop</span>
                                    )}
                                  </div>
                                  <div className="relative">
                                    <input 
                                      type="number" 
                                      defaultValue={ws.stock}
                                      className="w-full max-w-[280px] bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all shadow-sm"
                                    />
                                    {ws.name === 'Pathao Shop' && (
                                      <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></span>
                                        <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter">Synced</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-20 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-200">
                      <i className="fa-solid fa-box-open text-3xl"></i>
                    </div>
                    <p className="font-medium">No inventory entries match your search criteria.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 px-1 pt-2">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-circle-info text-red-400"></i>
          <span>Inventory changes are synchronized across all connected channels in real-time.</span>
        </div>
        <div className="flex items-center gap-2">
           <i className="fa-solid fa-clock-rotate-left"></i>
           <span>Last Sync: Today, 12:31 PM</span>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
