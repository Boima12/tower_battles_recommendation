const API_BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"
    : "/api/v1";

export default API_BASE_URL;
