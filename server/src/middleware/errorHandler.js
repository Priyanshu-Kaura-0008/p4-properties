export default function errorHandler(error, req, res, next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';

  if (error.name === 'MulterError') {
    statusCode = 400;
    message = error.message;
  }

  if (error.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value entered';
  }

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
}
