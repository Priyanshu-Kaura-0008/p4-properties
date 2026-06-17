export const sendSuccess = (res, { statusCode = 200, message, data, meta } = {}) =>
  res.status(statusCode).json({
    success: true,
    ...(message ? { message } : {}),
    ...(data !== undefined ? { data } : {}),
    ...(meta ? { meta } : {}),
  });

export const sendCreated = (res, data, message = 'Resource created successfully') =>
  sendSuccess(res, { statusCode: 201, message, data });
