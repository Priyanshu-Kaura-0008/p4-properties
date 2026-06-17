import cloudinary from '../config/cloudinary.js';
import Testimonial from '../models/Testimonial.js';
import ApiError from '../utils/apiError.js';
import { sendCreated, sendSuccess } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const toBoolean = (value) => value === true || value === 'true';

const getPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create({
    ...req.body,
    featured: toBoolean(req.body.featured),
    approved: toBoolean(req.body.approved),
    image: req.uploadedImages?.[0],
  });

  sendCreated(res, testimonial, 'Testimonial created successfully');
});

export const getTestimonials = asyncHandler(async (req, res) => {
  const filter = { approved: true };
  if (req.query.featured !== undefined) filter.featured = req.query.featured === 'true';

  const { page, limit, skip } = getPagination(req.query);
  const [testimonials, total] = await Promise.all([
    Testimonial.find(filter).sort('-createdAt').skip(skip).limit(limit),
    Testimonial.countDocuments(filter),
  ]);

  sendSuccess(res, { data: testimonials, meta: { count: testimonials.length, total, page, pages: Math.ceil(total / limit) } });
});

export const getAllTestimonials = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.approved !== undefined) filter.approved = req.query.approved === 'true';
  if (req.query.featured !== undefined) filter.featured = req.query.featured === 'true';

  const { page, limit, skip } = getPagination(req.query);
  const [testimonials, total] = await Promise.all([
    Testimonial.find(filter).sort('-createdAt').skip(skip).limit(limit),
    Testimonial.countDocuments(filter),
  ]);

  sendSuccess(res, { data: testimonials, meta: { count: testimonials.length, total, page, pages: Math.ceil(total / limit) } });
});

export const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError('Testimonial not found', 404);

  sendSuccess(res, { data: testimonial });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError('Testimonial not found', 404);

  const updates = { ...req.body };
  if (updates.featured !== undefined) updates.featured = toBoolean(updates.featured);
  if (updates.approved !== undefined) updates.approved = toBoolean(updates.approved);

  if (req.uploadedImages?.[0]) {
    if (testimonial.image?.publicId) await cloudinary.uploader.destroy(testimonial.image.publicId);
    updates.image = req.uploadedImages[0];
  }

  const updated = await Testimonial.findByIdAndUpdate(req.params.id, updates, {
    returnDocument: 'after',
    runValidators: true,
  });
  sendSuccess(res, { data: updated, message: 'Testimonial updated successfully' });
});

export const approveTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    { approved: true },
    { returnDocument: 'after' },
  );
  if (!testimonial) throw new ApiError('Testimonial not found', 404);

  sendSuccess(res, { data: testimonial, message: 'Testimonial approved successfully' });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError('Testimonial not found', 404);

  if (testimonial.image?.publicId) await cloudinary.uploader.destroy(testimonial.image.publicId);
  await testimonial.deleteOne();

  sendSuccess(res, { message: 'Testimonial deleted successfully' });
});
