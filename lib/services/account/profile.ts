
import { BaseService } from '../base-service';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { User } from '@/lib/types/user';

export class ProfileService extends BaseService<User> {
  constructor() {
    super(API_ENDPOINTS.USERS.PROFILE);
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.update('current', data);
  }
}

export const profileService = new ProfileService();
