import apiClient from './api';

export interface MaintenanceRecord {
  id: string;
  equipment_id: string;
  equipment_name?: string;
  equipment_code?: string;
  maintenance_type: string;
  status: string;
  scheduled_date: string;
  start_date?: string;
  end_date?: string;
  technician?: string;
  description?: string;
  cost?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const maintenanceService = {
  getAll: (filters?: any) => apiClient.get('/maintenance', { params: filters }),
  create: (data: any) => apiClient.post('/maintenance', data),
  update: (id: string, data: any) => apiClient.put(`/maintenance/${id}`, data),
};
