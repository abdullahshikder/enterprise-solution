
import React, { useState, useEffect } from 'react';
import { Product, OrderSource } from '../types';

interface PriceManagerProps {
  products: Product[];
  onUpdatePrice: (id: string, prices: { price: number, discountPrice?: number }, source?: OrderSource) => void;
  initialSearch?: string;
}

const PriceManager: React.FC<PriceManagerProps> = ({ products, onUpdatePrice, initialSearch }) => {
  const [search, setSearch] = useState(initialSearch || '');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (initialSearch) {
      setSearch(initialSearch);
      const product = products.find(p => p.sku.toLowerCase() === initialSearch.toLowerCase());
      if (product) {
        setExpandedRows(new Set([product.id]));
      }
    } else if (products.length > 0 && !search) {
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
      {/* Search Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-red-100 transition-all">
            <i className="fa-solid fa-magnifying-glass text-gray-400 mr-3"></i>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white text-sm font-semibold w-full outline-none text-gray-900 placeholder-gray-400"
              placeholder="Search by SKU or name to manage prices..."
            />
            {search && (
              <i className="fa-solid fa-circle-xmark text-gray-300 cursor-pointer hover:text-gray-500" onClick={() => setSearch('')}></i>
            )}
          </div>
        </div>
        <div className="flex gap-3">
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-black transition-all shadow-sm">
                <i className="fa-solid fa-rotate"></i> Bulk Sync
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-white text-gray-400 font-black text-[10px] uppercase tracking-widest border-b border-gray-100">
            <tr>
              <th className="w-16 px-4 py-4"></th>
              <th className="px-6 py-4">SKU / Product</th>
              <th className="px-6 py-4 text-right">Master MRP</th>
              <th className="px-6 py-4 text-right">Master Sale</th>
              <th className="px-6 py-4 text-center">Channels</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map(p => {
              const isExpanded = expandedRows.has(p.id);
              return (
                <React.Fragment key={p.id}>
                  <tr 
                    className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${isExpanded ? 'bg-red-50/10' : ''}`} 
                    onClick={() => toggleRow(p.id)}
                  >
                    <td className="px-4 py-6 text-center">
                      <div className="inline-flex items-center justify-center w-6 h-6 border border-gray-200 rounded text-gray-400 bg-white shadow-sm">
                        <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px]`}></i>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                        <div className="font-black text-gray-900 uppercase text-[11px] tracking-tighter mb-1">{p.sku}</div>
                        <div className="text-xs text-gray-500 font-medium truncate max-w-[200px]">{p.name}</div>
                    </td>
                    <td className="px-6 py-6 text-right font-bold text-gray-400">৳{p.price}</td>
                    <td className="px-6 py-6 text-right font-black text-red-600 text-base">৳{p.discountPrice || p.price}</td>
                    <td className="px-6 py-6">
                        <div className="flex justify-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-500" title="Pathao Shop Active"></span>
                            <span className="w-2 h-2 rounded-full bg-blue-500" title="Website Active"></span>
                        </div>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-white">
                      <td colSpan={5} className="p-0 border-t border-gray-50 bg-gray-50/30">
                        <div className="py-8 px-12 space-y-6">
                           <div className="grid grid-cols-2 gap-12">
                               {p.channelPrices.map((cp) => (
                                   <div key={cp.source} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                       <div className="flex items-center justify-between">
                                           <div className="flex items-center gap-3">
                                               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cp.source === 'PATHAO_SHOP' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                                   <i className={`fa-solid ${cp.source === 'PATHAO_SHOP' ? 'fa-shop' : 'fa-globe'}`}></i>
                                               </div>
                                               <div>
                                                   <div className="text-sm font-black text-gray-900">{cp.source === 'PATHAO_SHOP' ? 'Pathao Shop' : 'Website'}</div>
                                                   <div className="text-[10px] text-gray-400 font-bold uppercase">Pricing Control</div>
                                               </div>
                                           </div>
                                           <button 
                                              onClick={() => onUpdatePrice(p.id, { price: cp.price, discountPrice: cp.discountPrice }, cp.source)}
                                              className="text-[10px] font-black uppercase bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition-all"
                                           >
                                               Save
                                           </button>
                                       </div>

                                       <div className="grid grid-cols-2 gap-4">
                                           <div className="space-y-1.5">
                                               <label className="text-[9px] text-gray-400 font-black uppercase">MRP</label>
                                               <div className="relative">
                                                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">৳</span>
                                                   <input 
                                                       type="number" 
                                                       defaultValue={cp.price}
                                                       className="w-full border border-gray-200 rounded-xl pl-7 pr-3 py-2 text-sm font-black text-gray-900 bg-white focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                                   />
                                               </div>
                                           </div>
                                           <div className="space-y-1.5">
                                               <label className="text-[9px] text-gray-400 font-black uppercase">Sale Price</label>
                                               <div className="relative">
                                                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400 font-bold text-xs">৳</span>
                                                   <input 
                                                       type="number" 
                                                       defaultValue={cp.discountPrice}
                                                       className="w-full border border-gray-200 rounded-xl pl-7 pr-3 py-2 text-sm font-black text-red-600 bg-white focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                                   />
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               ))}
                           </div>
                           
                           <div className="flex justify-center">
                               <button 
                                 onClick={() => onUpdatePrice(p.id, { price: p.price, discountPrice: p.discountPrice })}
                                 className="text-[10px] font-black uppercase text-[#E1232E] border border-red-100 bg-white py-2.5 px-8 rounded-xl hover:bg-red-50 transition-all shadow-sm flex items-center gap-2"
                               >
                                 <i className="fa-solid fa-rotate"></i> Reset All Channels to Master Price
                               </button>
                           </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 px-1 pt-2">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-shield-halved text-green-500"></i>
          <span>Secure platform-wise price isolation enabled. Updates are instant.</span>
        </div>
      </div>
    </div>
  );
};

export default PriceManager;
