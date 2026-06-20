import { body, query } from 'express-validator';

const allowedPurposes = ['buy', 'rent', 'Buy', 'Rent', 'Sale', 'Sell'];
const allowedCategories = ['Residential', 'Commercial'];
const allowedStatuses = ['Available', 'Sold', 'Rented', 'Draft'];

const parseJsonArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') throw new Error('must be an array or comma-separated string');

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  throw new Error('must be an array or comma-separated string');
};

const arrayLikeValidator = (field) =>
  body(field)
    .optional()
    .custom((value) => {
      parseJsonArray(value);
      return true;
    });

const requiredPropertyFields = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional({ checkFalsy: true }).trim(),
  body('price').isNumeric().withMessage('Price must be numeric'),
  body('propertyType').trim().notEmpty().withMessage('Property type is required'),
  body('purpose').optional().isIn(allowedPurposes).withMessage('Invalid purpose'),
  body('category').optional().isIn(allowedCategories).withMessage('Invalid property category'),
  body('city').optional({ checkFalsy: true }).trim(),
  body('location').trim().notEmpty().withMessage('Location is required'),
];

const optionalPropertyFields = [
  body('location').optional().trim().notEmpty().withMessage('Location cannot be empty'),
  body('locality').optional().trim().notEmpty().withMessage('Locality cannot be empty'),
  body('address').optional().trim().notEmpty().withMessage('Address cannot be empty'),
  body('area').optional().isNumeric().withMessage('Area must be numeric'),
  body('landArea').optional().isNumeric().withMessage('Land area must be numeric'),
  body('areaUnit').optional().trim().notEmpty().withMessage('Area unit cannot be empty'),
  body('bedrooms').optional().isInt({ min: 0 }).withMessage('Bedrooms must be a positive integer'),
  body('bathrooms').optional().isInt({ min: 0 }).withMessage('Bathrooms must be a positive integer'),
  body('parking').optional().isInt({ min: 0 }).withMessage('Parking must be a positive integer'),
  body('featured').optional().isBoolean().withMessage('Featured must be true or false'),
  body('status').optional().isIn(allowedStatuses).withMessage('Invalid property status'),
  body('googleMapLink').optional({ checkFalsy: true }).trim().isURL().withMessage('Google Map link must be a URL'),
  arrayLikeValidator('amenities'),
  arrayLikeValidator('removeImagePublicIds'),
];

export const createPropertyValidator = [...requiredPropertyFields, ...optionalPropertyFields];

export const updatePropertyValidator = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be numeric'),
  body('propertyType').optional().trim().notEmpty().withMessage('Property type cannot be empty'),
  body('purpose').optional().isIn(allowedPurposes).withMessage('Invalid purpose'),
  body('category').optional().isIn(allowedCategories).withMessage('Invalid property category'),
  body('city').optional().trim().notEmpty().withMessage('City cannot be empty'),
  ...optionalPropertyFields,
];

export const propertyQueryValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('featured').optional().isBoolean().withMessage('Featured must be true or false'),
  query('city').optional().trim().notEmpty().withMessage('City cannot be empty'),
  query('location').optional().trim().notEmpty().withMessage('Location cannot be empty'),
  query('purpose').optional().isIn(allowedPurposes).withMessage('Invalid purpose'),
  query('propertyType').optional().trim().notEmpty().withMessage('Property type cannot be empty'),
  query('type').optional().trim().notEmpty().withMessage('Property type cannot be empty'),
  query('category').optional().isIn(allowedCategories).withMessage('Invalid property category'),
  query('budget').optional().trim().notEmpty().withMessage('Budget cannot be empty'),
  query('minPrice').optional().isNumeric().withMessage('Minimum price must be numeric'),
  query('maxPrice').optional().isNumeric().withMessage('Maximum price must be numeric'),
  query('minArea').optional().isNumeric().withMessage('Minimum area must be numeric'),
  query('maxArea').optional().isNumeric().withMessage('Maximum area must be numeric'),
  query('minLandArea').optional().isNumeric().withMessage('Minimum land area must be numeric'),
  query('maxLandArea').optional().isNumeric().withMessage('Maximum land area must be numeric'),
  query('search').optional({ checkFalsy: true }).isString(),
  query('sort')
    .optional()
    .isIn(['latest', 'oldest', 'priceLow', 'priceHigh', 'largestArea', 'featured'])
    .withMessage('Invalid sort value'),
];
