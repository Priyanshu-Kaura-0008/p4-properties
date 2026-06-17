import { validationResult } from 'express-validator';
import ApiError from '../utils/apiError.js';

export default function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((error) => error.msg)
      .join(', ');
    return next(new ApiError(message, 400));
  }
  next();
}
