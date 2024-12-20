
import { apiService } from './api';
import type { ApiResponse, PaginatedResponse } from '@/lib/types/api';

export class BaseService<T> {
  constructor(protected baseUrl: string) {}

  async getAll(params?: Record<string, any>): Promise<T[]> {
    return apiService.get<T[]>(this.baseUrl, { params });
  }

  async getPaginated(page: number = 1, limit: number = 10): Promise<PaginatedResponse<T>> {
    return apiService.get<PaginatedResponse<T>>(this.baseUrl, {
      params: { page, limit }
    });
  }

  async getById(id: string): Promise<T> {
    return apiService.get<T>(`${this.baseUrl}/${id}`);
  }

  async create(data: Partial<T>): Promise<T> {
    return apiService.post<T>(this.baseUrl, data);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return apiService.put<T>(`${this.baseUrl}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete(`${this.baseUrl}/${id}`);
  }

  protected handleError(error: any): never {
    console.error('API Error:', error);
    throw error;
  }
}
