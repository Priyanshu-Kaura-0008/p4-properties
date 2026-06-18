import api from './api';

export const getDocuments = async (params = {}, config = {}) => {
  const { data } = await api.get('/documents', { ...config, params });
  return data;
};

export const createDocument = async (payload) => {
  const { data } = await api.post('/documents', payload);
  return data.data;
};

export const updateDocument = async (id, payload) => {
  const { data } = await api.put(`/documents/${id}`, payload);
  return data.data;
};

export const deleteDocument = async (id) => {
  const { data } = await api.delete(`/documents/${id}`);
  return data;
};

export default { getDocuments, createDocument, updateDocument, deleteDocument };
