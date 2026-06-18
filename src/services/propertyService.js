import api from './api';

export const getProperties = async (params = {}, config = {}) => {
  const { data } = await api.get('/properties', { ...config, params });
  return data;
};

export const searchProperties = async (params = {}, config = {}) => {
  const { data } = await api.get('/properties/search', { ...config, params });
  return data;
};

export const getProperty = async (idOrSlug, config = {}) => {
  const { data } = await api.get(`/properties/${idOrSlug}`, config);
  return data.data;
};

export const getPropertyById = async (id, config = {}) => {
  const { data } = await api.get(`/properties/id/${id}`, config);
  return data.data;
};

export const createProperty = async (payload, config = {}) => {
  const { data } = await api.post('/properties', payload, config);
  return data.data;
};

export const updateProperty = async (id, payload, config = {}) => {
  const { data } = await api.put(`/properties/${id}`, payload, config);
  return data.data;
};

export const deleteProperty = async (id) => {
  const { data } = await api.delete(`/properties/${id}`);
  return data;
};

export const getFeaturedProperties = async (params = {}, config = {}) => {
  const { data } = await api.get('/properties/featured', { ...config, params });
  return data;
};

export default {
  getProperties,
  searchProperties,
  getProperty,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
};
