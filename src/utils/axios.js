import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://ec2-54-188-124-127.us-west-2.compute.amazonaws.com", // Use Vite's environment variable
});

export default axiosInstance;
