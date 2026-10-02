import axios from "axios";

// URL base del backend (cambiar cuando tengan la definitiva)
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Adjuntar token automáticamente en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;