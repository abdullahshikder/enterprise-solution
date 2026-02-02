
import React, { useState, useEffect, useCallback } from 'react';
import { View, Order, Product, OrderStatus, OrderSource } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OrderList from './components/OrderList';
import ProductsModule from './components/ProductsModule';
import WebsiteBuilder from './components/WebsiteBuilder';
import OrderDetails from './components/OrderDetails';
import ProductDetails from './components/ProductDetails';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'P1',
    name: 'Kemei KM-235 Professional Hair Trimmer For Men',
    description: 'Professional hair trimmer from Kemei designed for precise and detailed trimming.',
    price: 1200,
    discountPrice: 650,
    stock: 53,
    image: 'https://picsum.photos/seed/trimmer/200/200',
    category: 'Health & Beauty > Personal Care',
    isPublished: true,
    sku: 'shgshs',
    createdDate: '28 Jan 2026',
    warehouseStocks: [
      { name: 'Pathao Shop', stock: 0 },
      { name: 'Shafin Bashu', stock: 3 },
      { name: 'pen-shop', stock: 50 }
    ],
    channelPrices: [
      { source: 'PATHAO_SHOP', price: 1200, discountPrice: 650 },
      { source: 'WEBSITE', price: 1200, discountPrice: 699 }
    ]
  },
  {
    id: 'P2',
    name: 'HTC AT 538 Rechargeable Hair and Beard Trimmer',
    description: 'Superior grooming session with high-grade stainless steel blades.',
    price: 1250,
    discountPrice: 512,
    stock: 8,
    image: 'https://picsum.photos/seed/htc/200/200',
    category: 'Health & Beauty > Personal Care',
    isPublished: true,
    sku: 'SKU-HTC-538',
    createdDate: '28 Jan 2026',
    warehouseStocks: [
      { name: 'Pathao Shop', stock: 4 },
      { name: 'Main Warehouse', stock: 4 }
    ],
    channelPrices: [
      { source: 'PATHAO_SHOP', price: 1250, discountPrice: 512 },
      { source: 'WEBSITE', price: 1250, discountPrice: 550 }
    ]
  },
  {
    id: 'P3',
    name: 'Karkuma Immune Plus 120 capsule',
    description: 'Functional food product specially formulated for boosting immune system.',
    price: 850,
    discountPrice: 810,
    stock: 12,
    image: 'https://picsum.photos/seed/karkuma/200/200',
    category: 'Health & Beauty > Supplements',
    isPublished: true,
    sku: 'SKU-KARK-120',
    createdDate: '29 Jan 2026',
    warehouseStocks: [
      { name: 'Pathao Shop', stock: 2 },
      { name: 'Main Warehouse', stock: 10 }
    ],
    channelPrices: [
      { source: 'PATHAO_SHOP', price: 850, discountPrice: 810 },
      { source: 'WEBSITE', price: 850, discountPrice: 810 }
    ]
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'Z64Y1250',
    customerName: 'Shaown',
    customerPhone: '01772241234',
    source: 'PATHAO_SHOP',
    status: 'ACCEPTED',
    date: 'Feb 2, 2026, 11:12 AM',
    total: 299,
    fee: 0,
    items: [{ productId: 'P1', productName: 'Kemei KM-235', quantity: 1, price: 299 }]
  },
  {
    id: 'WEB-001',
    customerName: 'Rahim Khan',
    customerPhone: '01811000000',
    source: 'WEBSITE',
    status: 'PENDING',
    date: 'Feb 2, 2026, 10:30 AM',
    total: 650,
    fee: 55,
    items: [{ productId: 'P1', productName: 'Kemei KM-235', quantity: 1, price: 650 }]
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const showNotification = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
    showNotification(`Stock updated for ${productId}. Synced to Pathao Shop & Website.`, 'success');
  };

  const handleUpdatePrice = (productId: string, prices: { price: number, discountPrice?: number }, source?: OrderSource) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      
      if (source) {
        // Update specific channel price
        const updatedChannels = p.channelPrices.map(cp => 
          cp.source === source ? { ...cp, price: prices.price, discountPrice: prices.discountPrice } : cp
        );
        return { ...p, channelPrices: updatedChannels };
      } else {
        // Master Price update - syncs all
        const syncedChannels = p.channelPrices.map(cp => ({ 
          ...cp, 
          price: prices.price, 
          discountPrice: prices.discountPrice 
        }));
        return { ...p, price: prices.price, discountPrice: prices.discountPrice, channelPrices: syncedChannels };
      }
    }));
    
    showNotification(source 
      ? `Price updated for ${source.replace('_', ' ')}.` 
      : `Master price updated. Synchronizing across all channels...`, 
    'info');
  };

  const importFromPathao = () => {
    showNotification('Importing catalog from Pathao Shop...', 'info');
    setTimeout(() => {
      showNotification('Successfully imported 12 products from Pathao Shop.', 'success');
    }, 1500);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <Dashboard orders={orders} setView={setCurrentView} />;
      case 'ORDERS':
        return <OrderList 
          orders={orders} 
          onViewDetails={(id) => { setSelectedOrderId(id); setCurrentView('ORDER_DETAILS'); }} 
          onUpdateStatus={handleUpdateStatus}
        />;
      case 'ORDER_DETAILS':
        const order = orders.find(o => o.id === selectedOrderId);
        return order ? <OrderDetails order={order} onBack={() => setCurrentView('ORDERS')} onUpdateStatus={handleUpdateStatus} /> : null;
      case 'PRODUCTS':
        return (
          <ProductsModule 
            products={products}
            onImport={importFromPathao}
            onViewDetails={(id) => { setSelectedProductId(id); setCurrentView('PRODUCT_DETAILS'); }}
            onUpdateStock={handleUpdateStock}
            onUpdatePrice={handleUpdatePrice}
            setView={setCurrentView}
          />
        );
      case 'PRODUCT_DETAILS':
        const product = products.find(p => p.id === selectedProductId);
        return product ? (
          <ProductDetails 
            product={product} 
            onBack={() => setCurrentView('PRODUCTS')} 
            onUpdatePrice={handleUpdatePrice} 
            onUpdateStock={handleUpdateStock} 
          />
        ) : null;
      case 'WEBSITES':
        return <WebsiteBuilder products={products} />;
      default:
        return <Dashboard orders={orders} setView={setCurrentView} />;
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showNotification(`Order ${orderId} status updated to ${newStatus}. Pathao notified.`, 'success');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={currentView} setView={(v) => setCurrentView(v)} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <img src="https://pathao.com/wp-content/uploads/2018/12/Logo-Pathao-v1.png" alt="Pathao Logo" className="h-6" />
            <span className="text-gray-900 font-bold text-lg">Enterprise</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm border px-3 py-1.5 rounded-md hover:bg-gray-50 font-medium">
              <i className="fa-solid fa-bolt text-yellow-500"></i> Instant Checkout
            </button>
            <div className="flex items-center gap-2 border-l pl-4">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">A</div>
              <span className="text-sm font-medium">Abdullah Shikder</span>
              <i className="fa-solid fa-chevron-down text-xs text-gray-400"></i>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          {notification && (
            <div className={`fixed top-20 right-8 z-50 p-4 rounded-lg shadow-lg border animate-bounce ${
              notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              {notification.message}
            </div>
          )}
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
