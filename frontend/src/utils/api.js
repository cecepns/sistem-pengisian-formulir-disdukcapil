import axios from 'axios';

export const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  baseURL: import.meta.env.VITE_API_URL || 'https://api.kingcreativestudio.my.id/form-dukcapil/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
