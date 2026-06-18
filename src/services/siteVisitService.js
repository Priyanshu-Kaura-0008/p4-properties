import api from './api';

export const getSiteVisits = async (params = {}, config = {}) => {
  const { data } = await api.get('/site-visits', { ...config, params });
  return data;
};

export const createSiteVisit = async (payload) => {
  const { data } = await api.post('/site-visits', payload);
  return data.data;
};

export const updateSiteVisit = async (id, payload) => {
  const { data } = await api.put(`/site-visits/${id}`, payload);
  return data.data;
};

export const deleteSiteVisit = async (id) => {
  const { data } = await api.delete(`/site-visits/${id}`);
  return data;
};

export default { getSiteVisits, createSiteVisit, updateSiteVisit, deleteSiteVisit };
