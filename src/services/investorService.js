import api from './api';

export const getInvestors = async (params = {}, config = {}) => {
  const { data } = await api.get('/investors', { ...config, params });
  return data;
};

export const createInvestor = async (payload) => {
  const { data } = await api.post('/investors', payload);
  return data.data;
};

export const updateInvestor = async (id, payload) => {
  const { data } = await api.put(`/investors/${id}`, payload);
  return data.data;
};

export const deleteInvestor = async (id) => {
  const { data } = await api.delete(`/investors/${id}`);
  return data;
};

export default { getInvestors, createInvestor, updateInvestor, deleteInvestor };
