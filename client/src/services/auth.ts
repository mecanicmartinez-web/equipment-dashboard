import apiClient from './api';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const authService = {
  register: (email: string, username: string, password: string, fullName?: string) =>
    apiClient.post('/auth/register', { email, username, password, full_name: fullName }),
  
  login: (email: string, password: string): Promise<{ data: AuthResponse }> =>
    apiClient.post('/auth/login', { email, password }),
  
  getCurrentUser: () =>
    apiClient.get('/auth/me'),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
