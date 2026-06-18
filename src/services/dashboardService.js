import api from './api';

export const getDashboardStats = async () => {
  const { data } = await api.get('/dashboard');
  return data;
};

export const getDashboardAnalytics = async () => {
  const { data } = await api.get('/dashboard/analytics');
  return data.data || data;
};

export default { getDashboardStats, getDashboardAnalytics };
