import Setting from '../models/Setting.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.findOne().sort('-createdAt');
  res.status(200).json({ success: true, data: settings || {} });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  res.status(200).json({ success: true, data: settings });
});
