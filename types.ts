
export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
export type OrderSource = 'PATHAO_SHOP' | 'WEBSITE';

export interface WarehouseStock {
  name: string;
  stock: number;
}

export interface ChannelPrice {
  source: OrderSource;
  price: number;
  discountPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Master Price
  discountPrice?: number;
  stock: number; // Total Stocks
  image: string;
  category: string;
  isPublished: boolean;
  sku: string;
  createdDate: string;
  warehouseStocks: WarehouseStock[];
  channelPrices: ChannelPrice[];
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  source: OrderSource;
  status: OrderStatus;
  date: string;
  total: number;
  fee?: number;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    variant?: string;
  }[];
}

export type View = 'DASHBOARD' | 'ORDERS' | 'PRODUCTS' | 'INVENTORY' | 'WEBSITES' | 'ORDER_DETAILS' | 'PRODUCT_DETAILS';
