// config.js
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// URL différente selon l'environnement
export const BACKEND_URL = isProduction
  ? import.meta.env.VITE_API_URL || "https://votre-backend.onrender.com"
  : "http://localhost:8000"; // Votre IP locale pour le dev mobile
