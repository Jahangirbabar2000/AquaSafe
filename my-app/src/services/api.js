import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token and redirect to login
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects/', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const readingsAPI = {
  getAll: (projectId) => api.get(`/readings/${projectId}`),
  create: (data) => api.post('/api/reading', data),
};

export const parametersAPI = {
  getAll: () => api.get('/parameters'),
  create: (data) => api.post('/parameters/', data),
};

export const notificationsAPI = {
  getAll: () => api.get('/api/notifications'),
  markAsViewed: (notificationIds) => api.put('/api/notifications/view', { notificationIds }),
};

export const authAPI = {
  login: (data) => api.post('/api/login', data),
  register: (data) => api.post('/api/register', data),
  resetPassword: (data) => api.post('/api/reset-password', data),
};

export const dashboardAPI = {
  getDashboardData: (projectId) => api.get(`/api/dashboard/${projectId}`),
};

export const devicesAPI = {
  getAll: (projectId) => api.get(`/devices/${projectId}`),
  create: (data) => api.post('/devices/', data),
  update: (id, data) => api.put(`/devices/${id}`, data),
  delete: (id) => api.delete(`/devices/${id}`),
};

export default api;

