import axios from 'axios';

const getBaseUrl = () => {
  try {
    return import.meta.env.VITE_API_BASE_URL || 'localhost:8080';
  } catch {
    return '';
  }
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

export default api;
