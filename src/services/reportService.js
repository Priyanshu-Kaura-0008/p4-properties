import api from './api';

export const getMonthlyReports = async (params = {}, config = {}) => {
  const { data } = await api.get('/reports/monthly', { ...config, params });
  return data;
};

export const generateMonthlyReport = async (payload) => {
  const { data } = await api.post('/reports/monthly', payload);
  return data.data;
};

export default { getMonthlyReports, generateMonthlyReport };
