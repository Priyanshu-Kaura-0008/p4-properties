import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const fileFilter = (req, file, cb) => {
  if (!allowedImageTypes.has(file.mimetype)) {
    return cb(new ApiError('Only JPEG, PNG, and WebP image uploads are allowed', 400), false);
  }

  cb(null, true);
};

const propertyImageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 12 },
}).array('images', 12);

const singleImageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
}).single('image');

const runUpload = (uploadHandler, unexpectedFieldMessage) => (req, res, next) => {
  uploadHandler(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return next(new ApiError('Image file size must be 5 MB or less', 400));
      }

      if (error.code === 'LIMIT_FILE_COUNT') {
        return next(new ApiError('A maximum of 12 images can be uploaded', 400));
      }

      if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return next(new ApiError(unexpectedFieldMessage, 400));
      }
    }

    if (error) return next(error);

    next();
  });
};

export const setUploadFolder = (folder) => (req, res, next) => {
  req.cloudinaryFolder = folder;
  next();
};

export const uploadPropertyImages = runUpload(propertyImageUpload, 'Upload property images using the images field');
export const uploadSingleImage = runUpload(singleImageUpload, 'Upload a single image using the image field');

const uploadBuffer = (file, folder = 'p4-properties/properties') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
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

export const uploadImagesToCloudinary = asyncHandler(async (req, res, next) => {
  const files = req.files?.length ? req.files : req.file ? [req.file] : [];

  if (!files.length) {
    req.uploadedImages = [];
    return next();
  }

  req.uploadedImages = await Promise.all(files.map((file) => uploadBuffer(file, req.cloudinaryFolder)));
  next();
});
