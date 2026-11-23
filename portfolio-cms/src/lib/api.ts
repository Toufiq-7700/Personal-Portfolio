import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Send HTTP-only cookies
  headers: { 'Content-Type': 'application/json' },
});

// ─── Auth ──────────────────────────────────────────────────────────────────
export const authApi = {
  login: (username: string, password: string) =>
    api.post('/api/admin/auth/login', { username, password }),
  logout: () => api.post('/api/admin/auth/logout'),
  me: () => api.get('/api/admin/auth/me'),
};

// ─── Public ────────────────────────────────────────────────────────────────
export const publicApi = {
  projects: () => api.get('/api/projects'),
  projectBySlug: (slug: string) => api.get(`/api/projects/${slug}`),
  skills: () => api.get('/api/skills'),
  achievements: () => api.get('/api/achievements'),
  education: () => api.get('/api/education'),
  experience: () => api.get('/api/experience'),
  research: () => api.get('/api/research'),
};

// ─── Admin ─────────────────────────────────────────────────────────────────
export const adminApi = {
  stats: () => api.get('/api/admin/stats'),

  // Projects
  projects: {
    list: (params?: Record<string, unknown>) => api.get('/api/admin/projects', { params }),
    create: (data: unknown) => api.post('/api/admin/projects', data),
    update: (id: string, data: unknown) => api.put(`/api/admin/projects/${id}`, data),
    delete: (id: string) => api.delete(`/api/admin/projects/${id}`),
  },

  // Skills
  skills: {
    list: () => api.get('/api/admin/skills'),
    create: (data: unknown) => api.post('/api/admin/skills', data),
    update: (id: string, data: unknown) => api.put(`/api/admin/skills/${id}`, data),
    delete: (id: string) => api.delete(`/api/admin/skills/${id}`),
  },

  // Achievements
  achievements: {
    list: () => api.get('/api/admin/achievements'),
    create: (data: unknown) => api.post('/api/admin/achievements', data),
    update: (id: string, data: unknown) => api.put(`/api/admin/achievements/${id}`, data),
    delete: (id: string) => api.delete(`/api/admin/achievements/${id}`),
  },

  // Education
  education: {
    list: () => api.get('/api/admin/education'),
    create: (data: unknown) => api.post('/api/admin/education', data),
    update: (id: string, data: unknown) => api.put(`/api/admin/education/${id}`, data),
    delete: (id: string) => api.delete(`/api/admin/education/${id}`),
  },

  // Experience
  experience: {
    list: () => api.get('/api/admin/experience'),
    create: (data: unknown) => api.post('/api/admin/experience', data),
    update: (id: string, data: unknown) => api.put(`/api/admin/experience/${id}`, data),
    delete: (id: string) => api.delete(`/api/admin/experience/${id}`),
  },

  // Research
  research: {
    list: () => api.get('/api/admin/research'),
    create: (data: unknown) => api.post('/api/admin/research', data),
    update: (id: string, data: unknown) => api.put(`/api/admin/research/${id}`, data),
    delete: (id: string) => api.delete(`/api/admin/research/${id}`),
  },

  // Media
  media: {
    list: () => api.get('/api/admin/media'),
    upload: (formData: FormData) =>
      api.post('/api/admin/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
  },
};
