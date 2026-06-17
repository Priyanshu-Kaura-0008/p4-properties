import cloudinary from '../config/cloudinary.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const uploadImageBuffer = (file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'p4-properties/test',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        });
      },
    );

    stream.end(file.buffer);
  });

export const testUploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError('image file is required', 400);

  const image = await uploadImageBuffer(req.file);

  res.status(201).json({
    success: true,
    image,
  });
});
