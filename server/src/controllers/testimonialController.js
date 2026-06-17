import cloudinary from '../config/cloudinary.js';
import Testimonial from '../models/Testimonial.js';
import ApiError from '../utils/apiError.js';
import { sendCreated, sendSuccess } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const toBoolean = (value) => value === true || value === 'true';

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

  const testimonials = await Testimonial.find(filter).sort('-createdAt');
  sendSuccess(res, { data: testimonials, meta: { count: testimonials.length } });
});

export const getAllTestimonials = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.approved !== undefined) filter.approved = req.query.approved === 'true';
  if (req.query.featured !== undefined) filter.featured = req.query.featured === 'true';

  const testimonials = await Testimonial.find(filter).sort('-createdAt');
  sendSuccess(res, { data: testimonials, meta: { count: testimonials.length } });
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

  const updated = await Testimonial.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  sendSuccess(res, { data: updated, message: 'Testimonial updated successfully' });
});

export const approveTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
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
