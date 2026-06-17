import SiteVisit from '../models/SiteVisit.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const propertyFields = 'title slug city locality price purpose propertyType';

const buildSiteVisitFilter = (query) => {
  const filter = {};

  if (query.status) filter.status = query.status;
  if (query.property) filter.property = query.property;
  if (query.preferredLocation) filter.preferredLocation = query.preferredLocation;
  if (query.propertyType) filter.propertyType = query.propertyType;

  if (query.fromDate || query.toDate) {
    filter.preferredDate = {};
    if (query.fromDate) filter.preferredDate.$gte = new Date(query.fromDate);
    if (query.toDate) filter.preferredDate.$lte = new Date(query.toDate);
  }

  if (query.search) filter.$text = { $search: query.search };

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
    dateAsc: 'preferredDate preferredTime',
    dateDesc: '-preferredDate preferredTime',
    status: 'status -createdAt',
  };

  return allowed[sort] || '-createdAt';
};

export const createSiteVisit = asyncHandler(async (req, res) => {
  const visit = await SiteVisit.create({
    property: req.body.property,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    preferredLocation: req.body.preferredLocation,
    budget: req.body.budget,
    propertyType: req.body.propertyType,
    preferredDate: req.body.preferredDate,
    preferredTime: req.body.preferredTime || 'Flexible',
    remarks: req.body.remarks,
  });

  res.status(201).json({ success: true, data: visit });
});

export const getSiteVisits = asyncHandler(async (req, res) => {
  const filter = buildSiteVisitFilter(req.query);
  const { page, limit, skip } = getPagination(req.query);
  const sort = getSort(req.query.sort);

  const [visits, total] = await Promise.all([
    SiteVisit.find(filter).sort(sort).skip(skip).limit(limit).populate('property', propertyFields),
    SiteVisit.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: visits.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: visits,
  });
});

export const updateSiteVisit = asyncHandler(async (req, res) => {
  const allowedUpdates = [
    'property',
    'name',
    'phone',
    'email',
    'address',
    'preferredLocation',
    'budget',
    'propertyType',
    'preferredDate',
    'preferredTime',
    'status',
    'remarks',
  ];
  const updates = {};

  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const visit = await SiteVisit.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  }).populate('property', propertyFields);

  if (!visit) throw new ApiError('Site visit not found', 404);

  res.status(200).json({ success: true, data: visit });
});

export const deleteSiteVisit = asyncHandler(async (req, res) => {
  const visit = await SiteVisit.findByIdAndDelete(req.params.id);
  if (!visit) throw new ApiError('Site visit not found', 404);

  res.status(200).json({ success: true, message: 'Site visit deleted successfully' });
});
