import axios from 'axios';
import toast from 'react-hot-toast';

export const API_BASE_URL = 'https://p4-properties.onrender.com/api';
export const TOKEN_KEY = 'p4_admin_token';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

export const setStoredToken = (token, remember = true) => {
  const primary = remember ? localStorage : sessionStorage;
  const secondary = remember ? sessionStorage : localStorage;
  primary.setItem(TOKEN_KEY, token);
  secondary.removeItem(TOKEN_KEY);
};

export const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

export const getApiErrorMessage = (error, fallback = 'Something went wrong') =>
  error?.response?.data?.message || error?.message || fallback;

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) clearStoredToken();
    return Promise.reject(error);
  },
);

export const handleApiError = (error, fallback) => {
  const message = getApiErrorMessage(error, fallback);
  toast.error(message);
  return message;
};

export default api;
