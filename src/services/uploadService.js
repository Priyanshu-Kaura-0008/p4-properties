import api from './api';

export const uploadImages = async (files = []) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  const { data } = await api.post('/uploads/properties', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export default { uploadImages };
