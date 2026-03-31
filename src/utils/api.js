import axios from 'axios';

/**
 * HOW TO SET YOUR BACKEND URL:
 *
 * In Vercel/Netlify dashboard → Environment Variables, add:
 *   VITE_API_URL = https://authflow-backend-xyz.onrender.com
 *   (just the base domain — NO trailing slash, NO /api)
 *
 * The /api prefix is added automatically below.
 *
 * Locally: frontend/.env already has VITE_API_URL=http://localhost:5000
 */

// Strip any accidental trailing slash, then always append /api
const rawBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
const BASE_URL = rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// On 401, clear stale token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
