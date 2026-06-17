import express from 'express';
import {
  createProperty,
  deleteProperty,
  getFeaturedProperties,
  getProperties,
  getPropertyById,
  getPropertyBySlug,
  updateProperty,
} from '../controllers/propertyController.js';
import { requireAdmin } from '../middleware/auth.js';
import { setUploadFolder, uploadImagesToCloudinary, uploadPropertyImages } from '../middleware/upload.js';
import validate from '../middleware/validate.js';
import { createPropertyValidator, propertyQueryValidator, updatePropertyValidator } from '../validators/propertyValidators.js';

const router = express.Router();

router
  .route('/')
  .post(
    requireAdmin,
    setUploadFolder('p4-properties/properties'),
    uploadPropertyImages,
    createPropertyValidator,
    validate,
    uploadImagesToCloudinary,
    createProperty,
  )
  .get(propertyQueryValidator, validate, getProperties);

router.get('/featured', getFeaturedProperties);
router.get('/id/:id', requireAdmin, getPropertyById);

router.get('/:slug', getPropertyBySlug);

router
  .route('/:id')
  .put(
    requireAdmin,
    setUploadFolder('p4-properties/properties'),
    uploadPropertyImages,
    updatePropertyValidator,
    validate,
    uploadImagesToCloudinary,
    updateProperty,
  )
  .delete(requireAdmin, deleteProperty);

export default router;
