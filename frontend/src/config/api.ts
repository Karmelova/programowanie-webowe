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
    }
    return config;
  });

  // api.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error.response?.status === 403 && error.response.data.message === "Invalid token") {
  //       localStorage.removeItem('authToken');
  //       window.location.href = '/auth/login';
  //     }
  //     return Promise.reject(error);
  //   }
  // );

export default api;
