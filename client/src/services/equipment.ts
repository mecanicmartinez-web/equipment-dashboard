import apiClient from './api';

export interface Equipment {
  id: string;
  code: string;
  name: string;
  category_id: string;
  category_name?: string;
  brand: string;
  model: string;
  serial_number: string;
  location: string;
  description?: string;
  purchase_date?: string;
  installation_date?: string;
  status: string;
  specs?: any[];
  created_at: string;
  updated_at: string;
}

export const equipmentService = {
  getAll: (filters?: any) => apiClient.get('/equipment', { params: filters }),
  getById: (id: string) => apiClient.get(`/equipment/${id}`),
  create: (data: any) => apiClient.post('/equipment', data),
  update: (id: string, data: any) => apiClient.put(`/equipment/${id}`, data),
  delete: (id: string) => apiClient.delete(`/equipment/${id}`),
};
