import express from 'express';
import {
  approveTestimonial,
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  getTestimonials,
  updateTestimonial,
} from '../controllers/testimonialController.js';
import { requireAdmin } from '../middleware/auth.js';
import { setUploadFolder, uploadImagesToCloudinary, uploadSingleImage } from '../middleware/upload.js';
import validate from '../middleware/validate.js';
import { testimonialValidator } from '../validators/testimonialValidators.js';

const router = express.Router();

router
  .route('/')
  .post(
    requireAdmin,
    setUploadFolder('p4-properties/testimonials'),
    uploadSingleImage,
    testimonialValidator,
    validate,
    uploadImagesToCloudinary,
    createTestimonial,
  )
  .get(getTestimonials);

router.get('/admin', requireAdmin, getAllTestimonials);
router.patch('/:id/approve', requireAdmin, approveTestimonial);

router
  .route('/:id')
  .put(
    requireAdmin,
    setUploadFolder('p4-properties/testimonials'),
    uploadSingleImage,
    testimonialValidator,
    validate,
    uploadImagesToCloudinary,
    updateTestimonial,
  )
  .delete(requireAdmin, deleteTestimonial);

export default router;
