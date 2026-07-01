import apiClient from './api';

export const analyticsService = {
  getStats: () => apiClient.get('/analytics/stats'),
  getEquipmentHistory: (equipmentId: string) => apiClient.get(`/analytics/equipment/${equipmentId}/history`),
};
