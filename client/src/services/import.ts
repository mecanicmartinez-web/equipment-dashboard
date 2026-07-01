import apiClient from './api';

export const importService = {
  importEquipment: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/import/equipment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
