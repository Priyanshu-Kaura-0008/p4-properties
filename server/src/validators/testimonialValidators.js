import { body } from 'express-validator';

export const testimonialValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').trim().notEmpty().withMessage('Review is required').isLength({ max: 1200 }),
  body('featured').optional().isBoolean(),
  body('approved').optional().isBoolean(),
];

export const updateTestimonialValidator = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty').isLength({ max: 80 }),
  body('location').optional().trim().notEmpty().withMessage('Location cannot be empty'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().trim().notEmpty().withMessage('Review cannot be empty').isLength({ max: 1200 }),
  body('featured').optional().isBoolean(),
  body('approved').optional().isBoolean(),
];
