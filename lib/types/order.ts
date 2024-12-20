export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: {
    id: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  paymentMethod: string;
}

export interface OrderStatusHistory {
  id: string;
  status: OrderStatus;
  timestamp: string;
  note?: string;
  updatedBy: string;
}
