import api, { clearStoredToken, setStoredToken } from './api';

export const login = async (email, password, remember = true) => {
  const { data } = await api.post('/auth/login', { email, password });
  if (data.token) setStoredToken(data.token, remember);
  return data;
};

export const logout = () => {
  clearStoredToken();
};

export const getProfile = async () => {
  const { data } = await api.get('/auth/profile');
  return data.data;
};

export default { login, logout, getProfile };
