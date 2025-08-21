import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? '' // përdor proxy të CRA
    : (process.env.REACT_APP_API_URL || 'https://localhost:7259');

const client = axios.create({
  baseURL: API_BASE_URL
});

export default client;
