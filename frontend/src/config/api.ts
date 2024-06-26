import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

const getToken = () => {
    return localStorage.getItem('authToken');
  };

  api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token found in localStorage:", token);
    }
    return config;
  });

export default api;
