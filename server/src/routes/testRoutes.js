import express from 'express';
import multer from 'multer';
import { testUploadImage } from '../controllers/testUploadController.js';
import ApiError from '../utils/apiError.js';

const router = express.Router();

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const imageFileFilter = (req, file, cb) => {
  if (!allowedImageTypes.has(file.mimetype)) {
    return cb(new ApiError('Only JPEG, PNG, and WebP image uploads are allowed', 400), false);
  }

  cb(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});

const handleSingleImageUpload = (req, res, next) => {
  upload.single('image')(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return next(new ApiError('Image file size must be 5 MB or less', 400));
      }

      if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return next(new ApiError('Upload a single image file using the image field', 400));
      }
    }

    if (error) return next(error);

    next();
  });
};

router.post('/upload', handleSingleImageUpload, testUploadImage);

export default router;
