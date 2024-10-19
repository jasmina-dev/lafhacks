import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000", // Use Vite's environment variable
});

export default axiosInstance;
