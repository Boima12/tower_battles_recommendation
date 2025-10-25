const API_BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"
    : "https://tower-battles-recommendation.onrender.com/api/v1";

export default API_BASE_URL;
