import axios from 'axios';

const getToken = () => localStorage.getItem('token') || null;

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use(
  (cfg) => {
    const newCfg = { ...cfg };
    const token = getToken();
    if (token) {
      newCfg.headers = { ...newCfg.headers, Authorization: `Bearer ${token}` };
    }
    return newCfg;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export const login = async (username, password) => {
  const response = await api.post('/login', { username, password });
  const { token, username: returnedUser } = response.data || {};
  if (token && returnedUser) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', returnedUser);
  }
  return response.data;
};

export const signup = async (username, password) => {
  const response = await api.post('/signup', { username, password });
  return response.data;
};

export const getChannels = async () => {
  const response = await api.get('/channels');
  return response.data;
};

export const getMessages = async () => {
  const response = await api.get('/messages');
  return response.data;
};

export default api;