import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

apiClient.interceptors.response.use(
  (response) => {
    const newToken = response.headers['authorization']?.replace('Bearer ', '');
    if (newToken) {
      localStorage.setItem('authToken', newToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const useAuth = () => {
  const [authToken, setAuthToken] = useLocalStorage('authToken', null);

  const login = async (loginEmail: string, loginPassword: string) => {
    try {
      const response = await apiClient.post('/login', {
        loginEmail,
        loginPassword,
      });
      const token = response.data.token;
      setAuthToken(token);
      console.log('Zalogowano pomyślnie:', token);
    } catch (error: any) {
      console.error('Błąd logowania:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const fetchProtectedData = async () => {
    try {
      const response = await apiClient.get('/api', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Dane chronione:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Błąd pobierania danych:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  return {
    login,
    fetchProtectedData,
    authToken,
  };
};

export default useAuth;
