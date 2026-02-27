// API Configuration
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

export const API_URL = isProduction 
  ? import.meta.env.VITE_API_URL || 'https://bookstore-api.onrender.com/api'
  : 'http://localhost:5000/api';

export const config = {
  apiUrl: API_URL,
  environment: isDevelopment ? 'development' : 'production',
  isDevelopment,
  isProduction
};

export default config;
