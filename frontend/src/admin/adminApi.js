import axios from 'axios';
import { getToken, removeToken } from './auth';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

adminApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      removeToken();
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export default adminApi;
