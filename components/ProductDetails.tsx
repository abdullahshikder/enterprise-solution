
import React, { useState } from 'react';
import { Product, OrderSource } from '../types';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onUpdatePrice: (id: string, prices: { price: number, discountPrice?: number }, source?: OrderSource) => void;
  onUpdateStock: (id: string, stock: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack, onUpdatePrice, onUpdateStock }) => {
  const [stock, setStock] = useState(product.stock);
  const [masterPrice, setMasterPrice] = useState(product.price);
  const [masterSalePrice, setMasterSalePrice] = useState(product.discountPrice || product.price);
  
  // State to track individual channel pricing inputs
  const [channelPrices, setChannelPrices] = useState(
    product.channelPrices.reduce((acc, cp) => {
      acc[cp.source] = {
        price: cp.price,
        discountPrice: cp.discountPrice || cp.price
      };
      return acc;
    }, {} as Record<string, { price: number, discountPrice: number }>)
  );

  const handleChannelPriceChange = (source: OrderSource, field: 'price' | 'discountPrice', val: number) => {
    setChannelPrices(prev => ({
      ...prev,
      [source]: {
        ...prev[source],
        [field]: val
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <button onClick={onBack} className="flex items-center gap-3 text-sm text-gray-600 font-bold hover:text-red-600 transition-colors uppercase tracking-widest">
          <i className="fa-solid fa-arrow-left"></i> Product Details: #{product.sku}
        </button>
        <div className="flex gap-3">
          <button className="border border-gray-200 bg-white text-gray-700 px-6 py-2.5 rounded-xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm">
            Manage Gallery
          </button>
          <button className="bg-[#E1232E] text-white px-8 py-2.5 rounded-xl text-sm font-black hover:bg-red-700 transition-all shadow-md">
            Save All Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Master Price & Stock Control */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-black text-gray-900">Unified Master Control</h3>
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Sync</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block">Master MRP</label>
                   <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">৳</span>
                      <input 
                        type="number" 
                        value={masterPrice} 
                        onChange={(e) => setMasterPrice(parseInt(e.target.value))}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3.5 font-black text-gray-900 bg-white focus:ring-2 focus:ring-red-100 outline-none shadow-sm"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block">Master Sales Price</label>
                   <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 font-bold">৳</span>
                      <input 
                        type="number" 
                        value={masterSalePrice} 
                        onChange={(e) => setMasterSalePrice(parseInt(e.target.value))}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3.5 font-black text-red-600 bg-white focus:ring-2 focus:ring-red-100 outline-none shadow-sm"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block">Master Stock</label>
                   <div className="relative">
                      <input 
                        type="number" 
                        value={stock} 
                        onChange={(e) => setStock(parseInt(e.target.value))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 font-black text-gray-900 bg-white focus:ring-2 focus:ring-red-100 outline-none shadow-sm"
                      />
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 mt-6">
               <button 
                 onClick={() => onUpdatePrice(product.id, { price: masterPrice, discountPrice: masterSalePrice })}
                 className="text-[10px] font-black uppercase tracking-widest text-[#E1232E] border border-red-100 bg-red-50/50 py-3 rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2"
               >
                 <i className="fa-solid fa-rotate"></i> Sync Prices Everywhere
               </button>
               <button 
                 onClick={() => onUpdateStock(product.id, stock)}
                 className="text-[10px] font-black uppercase tracking-widest text-blue-600 border border-blue-100 bg-blue-50/50 py-3 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
               >
                 <i className="fa-solid fa-boxes-stacked"></i> Update Master Stock
               </button>
             </div>
          </div>

          {/* Platform Specific Pricing */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <div>
                   <h3 className="text-lg font-black text-gray-900">Platform-wise Pricing</h3>
                   <p className="text-xs text-gray-400 font-medium">Manage MRP and Sales Price independently per channel</p>
                </div>
                <div className="flex gap-1.5">
                   <span className="text-[8px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 font-black uppercase">Channel Control</span>
                </div>
             </div>

             <div className="space-y-6">
                {product.channelPrices.map((cp) => (
                  <div key={cp.source} className="p-6 border border-gray-100 rounded-2xl bg-gray-50/30 group hover:border-red-100 transition-all">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                              cp.source === 'PATHAO_SHOP' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                           }`}>
                              <i className={`fa-solid ${cp.source === 'PATHAO_SHOP' ? 'fa-shop' : 'fa-globe'}`}></i>
                           </div>
                           <div>
                              <div className="flex items-center gap-2">
                                 <span className="font-black text-gray-900">{cp.source === 'PATHAO_SHOP' ? 'Pathao Shop' : 'Personal Website'}</span>
                                 {cp.source === 'PATHAO_SHOP' && (
                                   <span className="text-[8px] bg-red-50 text-red-600 px-1 py-0.5 rounded font-black uppercase tracking-tighter">Shop</span>
                                 )}
                              </div>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Channel</span>
                           </div>
                        </div>
                        <button 
                          onClick={() => onUpdatePrice(product.id, channelPrices[cp.source], cp.source)}
                          className="bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl hover:bg-gray-800 shadow-sm transition-all"
                        >
                          Update Channel
                        </button>
                     </div>

                     <div className="grid grid-cols-2 gap-6 pl-16">
                        <div className="space-y-1.5">
                           <label className="text-[9px] text-gray-400 font-black uppercase block">MRP (Original)</label>
                           <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">৳</span>
                              <input 
                                type="number" 
                                value={channelPrices[cp.source].price}
                                onChange={(e) => handleChannelPriceChange(cp.source, 'price', parseInt(e.target.value))}
                                className="w-full border border-gray-200 rounded-xl pl-7 pr-3 py-2.5 font-black text-gray-900 bg-white focus:ring-2 focus:ring-red-100 outline-none shadow-sm"
                                placeholder="0"
                              />
                           </div>
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[9px] text-gray-400 font-black uppercase block">Sales Price (Current)</label>
                           <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400 font-bold text-xs">৳</span>
                              <input 
                                type="number" 
                                value={channelPrices[cp.source].discountPrice}
                                onChange={(e) => handleChannelPriceChange(cp.source, 'discountPrice', parseInt(e.target.value))}
                                className="w-full border border-gray-200 rounded-xl pl-7 pr-3 py-2.5 font-black text-red-600 bg-white focus:ring-2 focus:ring-red-100 outline-none shadow-sm"
                                placeholder="0"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
             <h3 className="text-lg font-black text-gray-900">Basic Information</h3>
             <div>
               <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-2">Product Name</label>
               <input 
                 type="text" 
                 value={product.name} 
                 readOnly 
                 className="w-full border border-gray-200 rounded-xl px-5 py-3.5 bg-white text-gray-900 font-black text-base shadow-sm outline-none cursor-default" 
               />
             </div>
             <div>
               <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-2">Description</label>
               <div className="border border-gray-100 rounded-2xl p-6 bg-white text-gray-700 font-medium leading-relaxed text-sm shadow-sm" dangerouslySetInnerHTML={{ __html: product.description }}></div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-black text-gray-900 border-b border-gray-100 pb-4 mb-6 uppercase tracking-widest flex items-center justify-between">
                <span>Additional Info</span>
                <span className="text-[8px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 font-black">Shop Sync</span>
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                   <span className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">Status:</span>
                   <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[10px] font-black border border-green-200 tracking-widest uppercase shadow-sm">PUBLISHED</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">Last Updated:</span>
                   <span className="bg-white px-3 py-1 rounded-lg text-[10px] font-bold text-gray-900 border border-gray-200 uppercase tracking-tighter shadow-sm">Today, 4:15 PM</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-gray-400 font-bold uppercase text-[10px] tracking-tighter">Commission:</span>
                   <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-[10px] font-black border border-red-100 tracking-widest shadow-sm">12%</span>
                </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-black text-gray-900 border-b border-gray-100 pb-4 mb-6 uppercase tracking-widest">Global Settings</h3>
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-2">Category</label>
                    <div className="bg-white p-3.5 border border-gray-200 rounded-xl text-xs text-gray-900 font-black shadow-sm uppercase tracking-tighter">{product.category}</div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-2">Master Base</label>
                       <div className="bg-white border border-gray-200 rounded-xl p-3.5 text-xs text-gray-900 font-black shadow-sm">৳{product.price}</div>
                    </div>
                    <div>
                       <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-2">Sale Price</label>
                       <div className="bg-white border border-red-200 rounded-xl p-3.5 text-xs text-red-600 font-black shadow-sm">৳{product.discountPrice}</div>
                    </div>
                 </div>
                 <button 
                   onClick={() => onUpdatePrice(product.id, { price: masterPrice, discountPrice: masterSalePrice })}
                   className="w-full bg-[#E1232E] text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 shadow-lg transition-all flex items-center justify-center gap-2"
                 >
                   <i className="fa-solid fa-cloud-arrow-up"></i> Sync Price Everywhere
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
