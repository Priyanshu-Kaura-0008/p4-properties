import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  const bearer = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
  const token = bearer || req.cookies?.token;

  if (!token) throw new ApiError('Authentication required', 401);

  const decoded = jwt.verify(token, env.JWT_SECRET);
  const user = await User.findById(decoded.id).select('-password');
  if (!user) throw new ApiError('User no longer exists', 401);

  req.user = user;
  next();
});

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') throw new ApiError('Admin access required', 403);
  next();
};

export const requireAdmin = [protect, adminOnly];
