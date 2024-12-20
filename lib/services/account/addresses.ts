
import { BaseService } from '../base-service';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { Address } from '@/lib/types/address';

export class AddressService extends BaseService<Address> {
  constructor() {
    super(API_ENDPOINTS.USERS.ADDRESSES);
  }

  async setDefault(id: string): Promise<void> {
    return this.update(id, { isDefault: true });
  }
}

export const addressService = new AddressService();
