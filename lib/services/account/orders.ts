
import { BaseService } from '../base-service';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { Order } from '@/lib/types/order';

export class OrderService extends BaseService<Order> {
  constructor() {
    super(API_ENDPOINTS.USERS.ORDERS);
  }

  async updateStatus(id: string, status: string, note?: string): Promise<Order> {
    return this.update(id, { status, note });
  }
}

export const orderService = new OrderService();
