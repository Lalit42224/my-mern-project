// config.js
export const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000" // ✅ local backend for dev
    : "https://verse-link-backend.onrender.com"; // ✅ live backend
