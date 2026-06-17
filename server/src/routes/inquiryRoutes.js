import express from 'express';
import { createInquiry, deleteInquiry, getInquiries, getInquiryById, updateInquiry } from '../controllers/inquiryController.js';
import { requireAdmin } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { inquiryQueryValidator, inquiryValidator, updateInquiryValidator } from '../validators/leadValidators.js';

const router = express.Router();

router
  .route('/')
  .post(inquiryValidator, validate, createInquiry)
  .get(requireAdmin, inquiryQueryValidator, validate, getInquiries);

router
  .route('/:id')
  .get(requireAdmin, getInquiryById)
  .put(requireAdmin, updateInquiryValidator, validate, updateInquiry)
  .delete(requireAdmin, deleteInquiry);

export default router;
