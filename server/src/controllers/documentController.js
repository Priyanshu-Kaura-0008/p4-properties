import PropertyDocument from '../models/PropertyDocument.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createDocument = asyncHandler(async (req, res) => {
  const document = await PropertyDocument.create({ ...req.body, uploadedBy: req.user?._id });
  res.status(201).json({ success: true, data: document });
});

export const getDocuments = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.property) filter.property = req.query.property;
  if (req.query.type) filter.type = req.query.type;
  const documents = await PropertyDocument.find(filter).sort('-createdAt').populate('property', 'title slug city location');
  res.status(200).json({ success: true, count: documents.length, data: documents });
});

export const updateDocument = asyncHandler(async (req, res) => {
  const document = await PropertyDocument.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
  if (!document) throw new ApiError('Document not found', 404);
  res.status(200).json({ success: true, data: document });
});

export const deleteDocument = asyncHandler(async (req, res) => {
  const document = await PropertyDocument.findByIdAndDelete(req.params.id);
  if (!document) throw new ApiError('Document not found', 404);
  res.status(200).json({ success: true, message: 'Document deleted successfully' });
});
