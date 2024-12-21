export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface StatusHistoryEntry {
  id: string;
  status: OrderStatus;
  timestamp: Date;
  note?: string;
  updatedBy: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: Date;
  total: number;
  status: OrderStatus;
  statusHistory: StatusHistoryEntry[];
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  paymentMethod: string;
}