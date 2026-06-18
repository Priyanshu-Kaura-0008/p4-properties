import api from './api';

export const getPropertyAlerts = async (params = {}, config = {}) => {
  const { data } = await api.get('/property-alerts', { ...config, params });
  return data;
};

export const createPropertyAlert = async (payload) => {
  const { data } = await api.post('/property-alerts', payload);
  return data.data;
};

export const updatePropertyAlert = async (id, payload) => {
  const { data } = await api.put(`/property-alerts/${id}`, payload);
  return data.data;
};

export const deletePropertyAlert = async (id) => {
  const { data } = await api.delete(`/property-alerts/${id}`);
  return data;
};

export default { getPropertyAlerts, createPropertyAlert, updatePropertyAlert, deletePropertyAlert };
