import ApiError from '../utils/apiError.js';

export default function notFound(req, res, next) {
  next(new ApiError(`Route not found: ${req.originalUrl}`, 404));
}
