import cloudinary from '../config/cloudinary.js';
import Blog from '../models/Blog.js';
import ApiError from '../utils/apiError.js';
import { sendCreated, sendSuccess } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import slugify from 'slugify';

const normalizeArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map((item) => String(item).trim()).filter(Boolean);
  } catch {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const toBoolean = (value) => value === true || value === 'true';

const buildBlogFilter = (query, admin = false) => {
  const filter = {};
  if (!admin) filter.published = true;
  if (admin && query.published !== undefined) filter.published = query.published === 'true';
  if (query.category) filter.category = query.category;
  if (query.search) filter.$text = { $search: query.search };
  return filter;
};

const getPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create({
    title: req.body.title,
    excerpt: req.body.excerpt,
    content: req.body.content,
    category: req.body.category,
    tags: normalizeArray(req.body.tags),
    published: toBoolean(req.body.published),
    coverImage: req.uploadedImages?.[0],
    author: req.user._id,
  });

  sendCreated(res, blog, 'Blog created successfully');
});

export const getBlogs = asyncHandler(async (req, res) => {
  const filter = buildBlogFilter(req.query, req.user?.role === 'admin');
  const { page, limit, skip } = getPagination(req.query);

  const [blogs, total] = await Promise.all([
    Blog.find(filter).sort('-createdAt').skip(skip).limit(limit).populate('author', 'name email'),
    Blog.countDocuments(filter),
  ]);

  sendSuccess(res, {
    data: blogs,
    meta: { count: blogs.length, total, page, pages: Math.ceil(total / limit) },
  });
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, published: true }).populate('author', 'name email');
  if (!blog) throw new ApiError('Blog not found', 404);
  sendSuccess(res, { data: blog });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError('Blog not found', 404);

  const updates = {};
  ['title', 'excerpt', 'content', 'category'].forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  if (updates.title) updates.slug = `${slugify(updates.title, { lower: true, strict: true })}-${blog._id.toString().slice(-6)}`;
  if (req.body.tags !== undefined) updates.tags = normalizeArray(req.body.tags);
  if (req.body.published !== undefined) updates.published = toBoolean(req.body.published);

  if (req.uploadedImages?.[0]) {
    if (blog.coverImage?.publicId) await cloudinary.uploader.destroy(blog.coverImage.publicId);
    updates.coverImage = req.uploadedImages[0];
  }

  const updated = await Blog.findByIdAndUpdate(req.params.id, updates, {
    returnDocument: 'after',
    runValidators: true,
  }).populate('author', 'name email');

  sendSuccess(res, { data: updated, message: 'Blog updated successfully' });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError('Blog not found', 404);

  if (blog.coverImage?.publicId) await cloudinary.uploader.destroy(blog.coverImage.publicId);
  await blog.deleteOne();

  sendSuccess(res, { message: 'Blog deleted successfully' });
});
