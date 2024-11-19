import axios from "axios";

// Create an Axios instance with the backend's base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api", // Use environment variable
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Set timeout (in milliseconds)
});

// Automatically attach token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response, // Simply return the response on success
  (error) => {
    // Handle specific error cases
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login or show session expired message
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.error("API Error:", error.response.data.message || error.message);
      }
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
