
import React, { useState } from 'react';
import { Product, View, OrderSource } from '../types';
import ProductList from './ProductList';
import InventoryManager from './InventoryManager';
import PriceManager from './PriceManager';
import MediaGallery from './MediaGallery';

interface ProductsModuleProps {
  products: Product[];
  onImport: () => void;
  onViewDetails: (id: string) => void;
  onUpdateStock: (id: string, stock: number) => void;
  onUpdatePrice: (id: string, prices: { price: number, discountPrice?: number }, source?: OrderSource) => void;
  setView: (v: View) => void;
}

const ProductsModule: React.FC<ProductsModuleProps> = ({ 
  products, 
  onImport, 
  onViewDetails, 
  onUpdateStock,
  onUpdatePrice
}) => {
  const [showInventory, setShowInventory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [overlaySearchTerm, setOverlaySearchTerm] = useState('');

  const handleOpenInventory = (sku?: string) => {
    if (sku) setOverlaySearchTerm(sku);
    setShowInventory(true);
  };

  const handleOpenPriceManager = (sku?: string) => {
    if (sku) setOverlaySearchTerm(sku);
    setShowPrice(true);
  };

  return (
    <div className="relative">
      {/* Primary View: Catalogue */}
      <div className="animate-in fade-in duration-300">
        <ProductList 
          products={products} 
          onImport={onImport} 
          onViewDetails={onViewDetails}
          onInventoryClick={(sku) => handleOpenInventory(sku)}
          onPriceClick={(sku) => handleOpenPriceManager(sku)}
          onMediaClick={() => setShowMedia(true)}
        />
      </div>

      {/* Overlay Window for Inventory Management */}
      {showInventory && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setShowInventory(false)}
          />
          <div className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E1232E] flex items-center justify-center text-lg">
                  <i className="fa-solid fa-warehouse"></i>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Inventory Management</h2>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Unified Warehouse Stock Control</p>
                </div>
              </div>
              <button 
                onClick={() => setShowInventory(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 bg-white">
              <InventoryManager 
                products={products} 
                onUpdateStock={onUpdateStock} 
                initialSearch={overlaySearchTerm}
              />
            </div>
          </div>
        </div>
      )}

      {/* Overlay Window for Price Management */}
      {showPrice && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setShowPrice(false)}
          />
          <div className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center text-lg">
                  <i className="fa-solid fa-tags"></i>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Price Management</h2>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Platform-Wise Pricing Control</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPrice(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 bg-white">
              <PriceManager 
                products={products} 
                onUpdatePrice={onUpdatePrice} 
                initialSearch={overlaySearchTerm}
              />
            </div>
          </div>
        </div>
      )}

      {/* Overlay Window for Media Gallery */}
      {showMedia && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setShowMedia(false)}
          />
          <div className="relative w-full max-w-6xl bg-white h-full max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E1232E] flex items-center justify-center text-xl">
                  <i className="fa-solid fa-photo-film"></i>
                </div>
                <div>
                   <h2 className="text-2xl font-black text-gray-900">Media Library</h2>
                   <p className="text-xs text-gray-400 font-medium">Global product assets and marketing materials</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMedia(false)}
                className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 bg-gray-50/20">
              <MediaGallery />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsModule;
