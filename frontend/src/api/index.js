import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProjects = (params) => API.get('/projects', { params });
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const seedProjects = () => API.post('/projects/seed/data');

export const sendMessage = (data) => API.post('/contact', data);
export const getMessages = () => API.get('/contact');
export const deleteMessage = (id) => API.delete(`/contact/${id}`);
export const markRead = (id) => API.patch(`/contact/${id}/read`);

export const loginAdmin = (data) => API.post('/auth/login', data);
export const verifyToken = () => API.get('/auth/verify');
export const setupAdmin = () => API.post('/auth/setup');

export default API;
