import api from './api';

export const getTestimonials = async (params = {}, config = {}) => {
  const { data } = await api.get('/testimonials', { ...config, params });
  return data;
};

export const getAdminTestimonials = async (params = {}, config = {}) => {
  const { data } = await api.get('/testimonials/admin', { ...config, params });
  return data;
};

export const createTestimonial = async (payload, config = {}) => {
  const { data } = await api.post('/testimonials', payload, config);
  return data.data;
};

export const updateTestimonial = async (id, payload, config = {}) => {
  const { data } = await api.put(`/testimonials/${id}`, payload, config);
  return data.data;
};

export const approveTestimonial = async (id) => {
  const { data } = await api.patch(`/testimonials/${id}/approve`);
  return data.data;
};

export const deleteTestimonial = async (id) => {
  const { data } = await api.delete(`/testimonials/${id}`);
  return data;
};

export default {
  getTestimonials,
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  approveTestimonial,
  deleteTestimonial,
};
