import Inquiry from '../models/Inquiry.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const propertyFields = 'title slug city locality price purpose propertyType';

const buildInquiryFilter = (query) => {
  const filter = {};

  if (query.status) filter.status = query.status;
  if (query.property) filter.property = query.property;

  if (query.search) {
    filter.$text = { $search: query.search };
  }

  return filter;
};

const getPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const getSort = (sort) => {
  const allowed = {
    latest: '-createdAt',
    oldest: 'createdAt',
    status: 'status -createdAt',
  };

  return allowed[sort] || '-createdAt';
};

export const createInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    message: req.body.message,
    property: req.body.property,
  });

  res.status(201).json({ success: true, data: inquiry });
});

export const getInquiries = asyncHandler(async (req, res) => {
  const filter = buildInquiryFilter(req.query);
  const { page, limit, skip } = getPagination(req.query);
  const sort = getSort(req.query.sort);

  const [inquiries, total] = await Promise.all([
    Inquiry.find(filter).sort(sort).skip(skip).limit(limit).populate('property', propertyFields),
    Inquiry.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: inquiries.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: inquiries,
  });
});

export const getInquiryById = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id).populate('property', propertyFields);
  if (!inquiry) throw new ApiError('Inquiry not found', 404);

  res.status(200).json({ success: true, data: inquiry });
});

export const updateInquiry = asyncHandler(async (req, res) => {
  const allowedUpdates = ['name', 'phone', 'email', 'message', 'property', 'status', 'notes'];
  const updates = {};

  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, updates, {
    returnDocument: 'after',
    runValidators: true,
  }).populate('property', propertyFields);

  if (!inquiry) throw new ApiError('Inquiry not found', 404);

  res.status(200).json({ success: true, data: inquiry });
});

export const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) throw new ApiError('Inquiry not found', 404);

  res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
});
