import axios from "axios";


const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";


export const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 60_000,
});


// ─────────────────────────────────────────────
// Request interceptor
// Automatically attach JWT access token
// ─────────────────────────────────────────────

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("lb_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// ─────────────────────────────────────────────
// Response interceptor
// Handle expired / invalid authentication
// ─────────────────────────────────────────────

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("lb_token");
        localStorage.removeItem("lb_user");

        // Avoid repeatedly redirecting if the
        // user is already on the login page.
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);


export default api;