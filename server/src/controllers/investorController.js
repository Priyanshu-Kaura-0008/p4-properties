import Investor from '../models/Investor.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { assignLeadOwner } from '../services/assignmentService.js';

const getPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

const buildFilter = (query) => {
  const filter = {};
  ['status', 'source', 'preferredLocation', 'propertyType'].forEach((field) => {
    if (query[field]) filter[field] = query[field];
  });
  if (query.search) filter.$text = { $search: query.search };
  return filter;
};

export const createInvestor = asyncHandler(async (req, res) => {
  const investor = await Investor.create({
    ...req.body,
    assignedAgent: req.body.assignedAgent || assignLeadOwner({ preferredLocation: req.body.preferredLocation }),
  });
  res.status(201).json({ success: true, data: investor });
});

export const getInvestors = asyncHandler(async (req, res) => {
  const filter = buildFilter(req.query);
  const { page, limit, skip } = getPagination(req.query);
  const [investors, total] = await Promise.all([
    Investor.find(filter).sort('-createdAt').skip(skip).limit(limit),
    Investor.countDocuments(filter),
  ]);
  res.status(200).json({ success: true, count: investors.length, total, page, pages: Math.ceil(total / limit), data: investors });
});

export const updateInvestor = asyncHandler(async (req, res) => {
  const investor = await Investor.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
  if (!investor) throw new ApiError('Investor not found', 404);
  res.status(200).json({ success: true, data: investor });
});

export const deleteInvestor = asyncHandler(async (req, res) => {
  const investor = await Investor.findByIdAndDelete(req.params.id);
  if (!investor) throw new ApiError('Investor not found', 404);
  res.status(200).json({ success: true, message: 'Investor deleted successfully' });
});
