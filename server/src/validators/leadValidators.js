import { body, query } from 'express-validator';

const inquiryStatuses = ['new', 'contacted', 'site_visit_scheduled', 'negotiation', 'booked', 'registered', 'closed', 'lost'];
const legacyInquiryStatuses = ['pending'];
const leadSources = ['website', 'whatsapp', 'phone', 'google_ads', 'meta_ads', 'facebook', 'instagram', 'referral', 'walk_in', 'other'];
const siteVisitStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

export const inquiryValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
  body('phone').trim().notEmpty().withMessage('Phone is required').isLength({ max: 20 }),
  body('email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body('property').optional({ checkFalsy: true }).isMongoId().withMessage('Invalid property ID'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 1200 }),
  body('leadSource').optional().isIn(leadSources).withMessage('Invalid lead source'),
  body('budget').optional({ checkFalsy: true }).trim(),
  body('preferredLocation').optional({ checkFalsy: true }).trim(),
  body('assignedAgent').optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
  body('followUpDate').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('Follow-up date must be valid'),
];

export const updateInquiryValidator = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty').isLength({ max: 80 }),
  body('phone').optional().trim().notEmpty().withMessage('Phone cannot be empty').isLength({ max: 20 }),
  body('email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body('property').optional({ checkFalsy: true }).isMongoId().withMessage('Invalid property ID'),
  body('message').optional().trim().notEmpty().withMessage('Message cannot be empty').isLength({ max: 1200 }),
  body('status').optional().isIn(inquiryStatuses).withMessage('Invalid inquiry status'),
  body('leadSource').optional().isIn(leadSources).withMessage('Invalid lead source'),
  body('budget').optional({ checkFalsy: true }).trim(),
  body('preferredLocation').optional({ checkFalsy: true }).trim(),
  body('assignedAgent').optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
  body('followUpDate').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('Follow-up date must be valid'),
  body('notes').optional({ checkFalsy: true }).trim().isLength({ max: 1200 }),
];

export const inquiryQueryValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn([...inquiryStatuses, ...legacyInquiryStatuses]).withMessage('Invalid inquiry status'),
  query('leadSource').optional().isIn(leadSources).withMessage('Invalid lead source'),
  query('preferredLocation').optional().trim(),
  query('property').optional().isMongoId().withMessage('Invalid property ID'),
  query('search').optional().trim().notEmpty().withMessage('Search cannot be empty'),
  query('sort').optional().isIn(['latest', 'oldest', 'status']).withMessage('Invalid sort value'),
];

export const siteVisitValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Enter a valid 10-digit mobile number'),
  body('email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body('property').optional({ checkFalsy: true }).isMongoId().withMessage('Invalid property ID'),
  body('address').trim().notEmpty().withMessage('Address is required').isLength({ max: 300 }),
  body('preferredLocation').trim().notEmpty().withMessage('Preferred location is required'),
  body('budget').trim().notEmpty().withMessage('Budget is required'),
  body('propertyType').trim().notEmpty().withMessage('Property type is required'),
  body('preferredDate').isISO8601().toDate().withMessage('Valid preferred date is required'),
  body('preferredTime').optional({ checkFalsy: true }).trim(),
  body('leadSource').optional().isIn(leadSources).withMessage('Invalid lead source'),
  body('assignedAgent').optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
  body('followUpDate').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('Follow-up date must be valid'),
  body('remarks').optional({ checkFalsy: true }).trim().isLength({ max: 1200 }),
];

export const updateSiteVisitValidator = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty').isLength({ max: 80 }),
  body('phone')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Phone cannot be empty')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Enter a valid 10-digit mobile number'),
  body('email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body('property').optional({ checkFalsy: true }).isMongoId().withMessage('Invalid property ID'),
  body('address').optional().trim().isLength({ max: 300 }),
  body('preferredLocation').optional().trim().notEmpty().withMessage('Preferred location cannot be empty'),
  body('budget').optional().trim().notEmpty().withMessage('Budget cannot be empty'),
  body('propertyType').optional().trim().notEmpty().withMessage('Property type cannot be empty'),
  body('preferredDate').optional().isISO8601().toDate().withMessage('Valid preferred date is required'),
  body('preferredTime').optional().trim().notEmpty().withMessage('Preferred time cannot be empty'),
  body('status')
    .optional()
    .isIn(siteVisitStatuses)
    .withMessage('Invalid site visit status'),
  body('leadSource').optional().isIn(leadSources).withMessage('Invalid lead source'),
  body('assignedAgent').optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
  body('followUpDate').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('Follow-up date must be valid'),
  body('remarks').optional({ checkFalsy: true }).trim().isLength({ max: 1200 }),
];

export const siteVisitQueryValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(siteVisitStatuses)
    .withMessage('Invalid site visit status'),
  query('leadSource').optional().isIn(leadSources).withMessage('Invalid lead source'),
  query('property').optional().isMongoId().withMessage('Invalid property ID'),
  query('preferredLocation').optional().trim(),
  query('propertyType').optional().trim(),
  query('fromDate').optional().isISO8601().withMessage('fromDate must be a valid date'),
  query('toDate').optional().isISO8601().withMessage('toDate must be a valid date'),
  query('search').optional().trim().notEmpty().withMessage('Search cannot be empty'),
  query('sort').optional().isIn(['latest', 'oldest', 'dateAsc', 'dateDesc', 'status']).withMessage('Invalid sort value'),
];

export const statusValidator = (allowed) => [
  body('status').isIn(allowed).withMessage(`Status must be one of: ${allowed.join(', ')}`),
];
