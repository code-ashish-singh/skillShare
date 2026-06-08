import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => { if (err.response?.status === 401) window.location.href = "/login"; return Promise.reject(err); }
);

export const providerService = {
  getAll: (params) => api.get("/users/providers", { params }),
  getById: (id) => api.get(`/users/providers/${id}`),
  getSkills: () => api.get("/providers/skills"),
  getSkillById: (id) => api.get(`/providers/skills/${id}`),
};

export const bookingService = {
  create: (data) => api.post("/bookings", data),
  getMyBookings: (params) => api.get("/bookings/my", { params }),
  getProviderBookings: (params) => api.get("/bookings/provider", { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  updateStatus: (id, status, reason) => api.put(`/bookings/${id}/status`, { status, cancellationReason: reason }),
  cancel: (id, reason) => api.delete(`/bookings/${id}`, { data: { reason } }),
};

export const authService = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  me: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
  updateProfile: (data) => api.put("/auth/update-profile", data),
  changePassword: (data) => api.put("/auth/change-password", data),
};

export const reviewService = {
  getProviderReviews: (providerId, params) => api.get(`/reviews/provider/${providerId}`, { params }),
  create: (data) => api.post("/reviews", data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export const blogService = {
  getAll: (params) => api.get("/blogs", { params }),
  getById: (id) => api.get(`/blogs/${id}`),
};

export const reportService = {
  create: (data) => api.post("/reports", data),
  getMy: () => api.get("/reports/my"),
};

export default api;
