import axios from "axios";

const base = import.meta.env.VITE_BASE_URL || "/";
const baseURL = base.endsWith("/") ? `${base}api` : `${base}/api`;

const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const api = {
  get: (endpoint, config) => apiClient.get(endpoint, config).then((res) => res.data),
  post: (endpoint, data, config) => apiClient.post(endpoint, data, config).then((res) => res.data),
  put: (endpoint, data, config) => apiClient.put(endpoint, data, config).then((res) => res.data),
  patch: (endpoint, data, config) => apiClient.patch(endpoint, data, config).then((res) => res.data),
  delete: (endpoint, config) => apiClient.delete(endpoint, config).then((res) => res.data),
};

export default api;
