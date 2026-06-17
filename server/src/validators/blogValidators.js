import { body, query } from 'express-validator';

const arrayLike = (field) =>
  body(field)
    .optional()
    .custom((value) => {
      if (Array.isArray(value)) return true;
      if (typeof value === 'string') return true;
      throw new Error(`${field} must be an array or comma-separated string`);
    });

export const createBlogValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 180 }),
  body('excerpt').trim().notEmpty().withMessage('Excerpt is required').isLength({ max: 300 }),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('category').optional({ checkFalsy: true }).trim(),
  body('published').optional().isBoolean().withMessage('Published must be true or false'),
  arrayLike('tags'),
];

export const updateBlogValidator = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 180 }),
  body('excerpt').optional().trim().notEmpty().withMessage('Excerpt cannot be empty').isLength({ max: 300 }),
  body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
  body('category').optional({ checkFalsy: true }).trim(),
  body('published').optional().isBoolean().withMessage('Published must be true or false'),
  arrayLike('tags'),
];

export const blogQueryValidator = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('published').optional().isBoolean(),
  query('category').optional().trim(),
  query('search').optional().trim(),
];
