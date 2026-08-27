import axios from 'axios';

const getBaseUrl = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.VITE_API_BASE_URL) {
      return process.env.VITE_API_BASE_URL;
    }
  } catch {
    // ignore
  }

  try {
    const metaEnv = Function('return import.meta.env')();
    if (metaEnv && metaEnv.VITE_API_BASE_URL) {
      return metaEnv.VITE_API_BASE_URL;
    }
  } catch {
    // ignore
  }

  return 'https://abstalk-1.onrender.com';
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

export default api;
