import axios from "axios";
import API_BASE_URL from "../../config/api.js";

const api = axios.create({
    baseURL: API_BASE_URL,
});

// attach token automatically if have (optional, if your project doen't need token authentication, you can remove this part)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
