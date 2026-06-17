import cloudinary from '../config/cloudinary.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const uploadImages = asyncHandler(async (req, res) => {
  const images = req.uploadedImages || [];
  res.status(201).json({ success: true, count: images.length, data: images });
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) throw new ApiError('publicId is required', 400);

  await cloudinary.uploader.destroy(publicId);
  res.status(200).json({ success: true, message: 'Image deleted successfully' });
});
