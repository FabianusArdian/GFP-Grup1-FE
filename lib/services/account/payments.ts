
import { BaseService } from '../base-service';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { PaymentMethod } from '@/lib/types/payment';

export class PaymentMethodService extends BaseService<PaymentMethod> {
  constructor() {
    super(API_ENDPOINTS.USERS.PAYMENT_METHODS);
  }

  async setDefault(id: string): Promise<void> {
    return this.update(id, { isDefault: true });
  }
}

export const paymentService = new PaymentMethodService();
