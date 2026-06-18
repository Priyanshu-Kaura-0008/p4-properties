import api from './api';

export const getBlogs = async (params = {}, config = {}) => {
  const { data } = await api.get('/blogs', { ...config, params });
  return data;
};

export const getBlog = async (slug, config = {}) => {
  const { data } = await api.get(`/blogs/${slug}`, config);
  return data.data;
};

export const createBlog = async (payload, config = {}) => {
  const { data } = await api.post('/blogs', payload, config);
  return data.data;
};

export const updateBlog = async (id, payload, config = {}) => {
  const { data } = await api.put(`/blogs/${id}`, payload, config);
  return data.data;
};

export const deleteBlog = async (id) => {
  const { data } = await api.delete(`/blogs/${id}`);
  return data;
};

export default { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
