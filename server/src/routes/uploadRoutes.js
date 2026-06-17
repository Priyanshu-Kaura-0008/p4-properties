import express from 'express';
import { deleteImage, uploadImages } from '../controllers/uploadController.js';
import { requireAdmin } from '../middleware/auth.js';
import { setUploadFolder, uploadImagesToCloudinary, uploadPropertyImages } from '../middleware/upload.js';

const router = express.Router();

router.post(
  '/properties',
  requireAdmin,
  setUploadFolder('p4-properties/properties'),
  uploadPropertyImages,
  uploadImagesToCloudinary,
  uploadImages,
);
router.delete('/images', requireAdmin, deleteImage);

export default router;
