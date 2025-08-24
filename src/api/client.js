import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'https://localhost:7259' // Përdor backend-in direkt në development
  : (process.env.REACT_APP_API_URL || 'https://localhost:7259');

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 sekonda timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor për të kapur errors
client.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.error('Backend nuk është duke punuar. Sigurohu që backend-i të jetë aktiv në https://localhost:7259');
    }
    return Promise.reject(error);
  }
);

export default client;

