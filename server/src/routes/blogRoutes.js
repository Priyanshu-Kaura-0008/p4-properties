import express from 'express';
import { createBlog, deleteBlog, getBlogBySlug, getBlogs, updateBlog } from '../controllers/blogController.js';
import { protect, requireAdmin } from '../middleware/auth.js';
import { setUploadFolder, uploadImagesToCloudinary, uploadSingleImage } from '../middleware/upload.js';
import validate from '../middleware/validate.js';
import { blogQueryValidator, createBlogValidator, updateBlogValidator } from '../validators/blogValidators.js';

const router = express.Router();

const optionalAuth = (req, res, next) => {
  if (!req.headers.authorization && !req.cookies?.token) return next();
  return protect(req, res, next);
};

router
  .route('/')
  .get(optionalAuth, blogQueryValidator, validate, getBlogs)
  .post(
    requireAdmin,
    setUploadFolder('p4-properties/blogs'),
    uploadSingleImage,
    createBlogValidator,
    validate,
    uploadImagesToCloudinary,
    createBlog,
  );

router.get('/:slug', getBlogBySlug);

router
  .route('/:id')
  .put(
    requireAdmin,
    setUploadFolder('p4-properties/blogs'),
    uploadSingleImage,
    updateBlogValidator,
    validate,
    uploadImagesToCloudinary,
    updateBlog,
  )
  .delete(requireAdmin, deleteBlog);

export default router;
