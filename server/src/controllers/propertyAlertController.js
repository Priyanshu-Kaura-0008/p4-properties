import PropertyAlert from '../models/PropertyAlert.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const getPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

export const createPropertyAlert = asyncHandler(async (req, res) => {
  const alert = await PropertyAlert.create(req.body);
  res.status(201).json({ success: true, data: alert });
});

export const getPropertyAlerts = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.active !== undefined) filter.active = req.query.active === 'true';
  if (req.query.location) filter.location = req.query.location;
  if (req.query.propertyType) filter.propertyType = req.query.propertyType;
  if (req.query.search) filter.$text = { $search: req.query.search };

  const { page, limit, skip } = getPagination(req.query);
  const [alerts, total] = await Promise.all([
    PropertyAlert.find(filter).sort('-createdAt').skip(skip).limit(limit),
    PropertyAlert.countDocuments(filter),
  ]);
  res.status(200).json({ success: true, count: alerts.length, total, page, pages: Math.ceil(total / limit), data: alerts });
});

export const updatePropertyAlert = asyncHandler(async (req, res) => {
  const alert = await PropertyAlert.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
  if (!alert) throw new ApiError('Property alert not found', 404);
  res.status(200).json({ success: true, data: alert });
});

export const deletePropertyAlert = asyncHandler(async (req, res) => {
  const alert = await PropertyAlert.findByIdAndDelete(req.params.id);
  if (!alert) throw new ApiError('Property alert not found', 404);
  res.status(200).json({ success: true, message: 'Property alert deleted successfully' });
});
