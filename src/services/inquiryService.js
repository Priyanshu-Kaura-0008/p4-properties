import api from './api';

export const getInquiries = async (params = {}, config = {}) => {
  const { data } = await api.get('/inquiries', { ...config, params });
  return data;
};

export const createInquiry = async (payload) => {
  const { data } = await api.post('/inquiries', payload);
  return data.data;
};

export const updateInquiry = async (id, payload) => {
  const { data } = await api.put(`/inquiries/${id}`, payload);
  return data.data;
};

export const deleteInquiry = async (id) => {
  const { data } = await api.delete(`/inquiries/${id}`);
  return data;
};

export default { getInquiries, createInquiry, updateInquiry, deleteInquiry };
