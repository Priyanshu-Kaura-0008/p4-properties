import cloudinary from '../config/cloudinary.js';
import Property from '../models/Property.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { buildPropertyQuery, getPagination, getSort } from '../utils/queryFeatures.js';
import slugify from 'slugify';

const normalizeArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map((item) => String(item).trim()).filter(Boolean);
  } catch {
    // Fall through to comma-separated parsing.
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const toNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === '') return fallback;
  return Number(value);
};

const toBoolean = (value) => value === true || value === 'true';

const normalizePurpose = (value) => {
  if (!value) return 'Buy';
  const normalized = String(value).trim().toLowerCase();
  if (normalized === 'buy') return 'Buy';
  if (normalized === 'rent') return 'Rent';
  if (normalized === 'sale') return 'Sale';
  if (normalized === 'sell') return 'Sell';
  return value;
};

const deleteCloudinaryImages = async (images = []) => {
  await Promise.all(
    images
      .filter((image) => image.publicId)
      .map((image) => cloudinary.uploader.destroy(image.publicId).catch(() => null)),
  );
};

const buildImagePayload = (uploadedImages = [], uploadedMainImage, uploadedGalleryImages = []) => {
  const mainImage = uploadedMainImage || uploadedImages[0];
  const galleryImages = uploadedGalleryImages.length ? uploadedGalleryImages : uploadedImages.slice(mainImage ? 1 : 0);

  return {
    mainImage,
    galleryImages,
    images: mainImage ? [mainImage, ...galleryImages] : galleryImages,
  };
};

const buildPropertyPayload = (body, uploadedImages = [], userId, uploadedMainImage, uploadedGalleryImages = []) => ({
  title: body.title,
  description: body.description || '',
  price: toNumber(body.price),
  propertyType: body.propertyType,
  purpose: normalizePurpose(body.purpose),
  category: body.category,
  city: body.city,
  location: body.location || body.locality || body.address,
  locality: body.locality || body.location,
  address: body.address || body.location || body.locality,
  area: toNumber(body.area ?? body.landArea),
  landArea: toNumber(body.landArea ?? body.area),
  areaUnit: body.areaUnit || 'sq ft',
  bedrooms: toNumber(body.bedrooms),
  bathrooms: toNumber(body.bathrooms),
  parking: toNumber(body.parking),
  featured: toBoolean(body.featured),
  status: body.status || 'Available',
  amenities: normalizeArray(body.amenities),
  googleMapLink: body.googleMapLink,
  ...buildImagePayload(uploadedImages, uploadedMainImage, uploadedGalleryImages),
  createdBy: userId,
});

export const createProperty = asyncHandler(async (req, res) => {
  const property = await Property.create(
    buildPropertyPayload(
      req.body,
      req.uploadedImages || [],
      req.user._id,
      req.uploadedMainImage,
      req.uploadedGalleryImages || [],
    ),
  );

  res.status(201).json({ success: true, data: property });
});

export const getProperties = asyncHandler(async (req, res) => {
  const filter = buildPropertyQuery(req.query);
  const { page, limit, skip } = getPagination(req.query);
  const sort = getSort(req.query.sort);

  const [properties, total] = await Promise.all([
    Property.find(filter).sort(sort).skip(skip).limit(limit).populate('createdBy', 'name email'),
    Property.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: properties.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: properties,
  });
});

export const getFeaturedProperties = asyncHandler(async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 8, 1), 24);
  const properties = await Property.find({ featured: true, status: 'Available' }).sort('-createdAt').limit(limit);

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
});

export const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).populate('createdBy', 'name email');
  if (!property) throw new ApiError('Property not found', 404);

  res.status(200).json({ success: true, data: property });
});

export const getPropertyByIdOrSlug = asyncHandler(async (req, res) => {
  const idOrSlug = req.params.slug || req.params.id;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
  const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug };

  const property = await Property.findOneAndUpdate(query, { $inc: { views: 1 } }, { returnDocument: 'after' }).populate(
    'createdBy',
    'name email',
  );

  if (!property) throw new ApiError('Property not found', 404);

  res.status(200).json({ success: true, data: property });
});

export const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) throw new ApiError('Property not found', 404);

  const updates = {};
  const stringFields = [
    'title',
    'description',
    'propertyType',
    'purpose',
    'category',
    'city',
    'location',
    'locality',
    'address',
    'areaUnit',
    'status',
    'googleMapLink',
  ];
  const numberFields = ['price', 'area', 'landArea', 'bedrooms', 'bathrooms', 'parking'];

  stringFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  if (updates.title) {
    updates.slug = `${slugify(updates.title, { lower: true, strict: true })}-${property._id.toString().slice(-6)}`;
  }

  if (updates.purpose) updates.purpose = normalizePurpose(updates.purpose);

  numberFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = toNumber(req.body[field]);
  });

  if (updates.location && updates.locality === undefined) updates.locality = updates.location;
  if (updates.locality && updates.location === undefined) updates.location = updates.locality;
  if (updates.location && updates.address === undefined) updates.address = updates.location;
  if (updates.area !== undefined && updates.landArea === undefined) updates.landArea = updates.area;
  if (updates.landArea !== undefined && updates.area === undefined) updates.area = updates.landArea;

  if (req.body.featured !== undefined) updates.featured = toBoolean(req.body.featured);
  if (req.body.amenities !== undefined) updates.amenities = normalizeArray(req.body.amenities);

  if (req.body.removeImagePublicIds) {
    const publicIdsToRemove = normalizeArray(req.body.removeImagePublicIds);
    const imagesToRemove = property.images.filter((image) => publicIdsToRemove.includes(image.publicId));

    await deleteCloudinaryImages(imagesToRemove);
    updates.mainImage =
      property.mainImage?.publicId && publicIdsToRemove.includes(property.mainImage.publicId) ? null : property.mainImage;
    updates.galleryImages = property.galleryImages.filter((image) => !publicIdsToRemove.includes(image.publicId));
    updates.images = property.images.filter((image) => !publicIdsToRemove.includes(image.publicId));
  }

  if (req.uploadedMainImage) {
    if (property.mainImage?.publicId) await deleteCloudinaryImages([property.mainImage]);
    updates.mainImage = req.uploadedMainImage;
  }

  if (req.uploadedGalleryImages?.length) {
    updates.galleryImages = [...(updates.galleryImages || property.galleryImages), ...req.uploadedGalleryImages];
  }

  const legacyImages = req.uploadedImages?.filter(
    (image) =>
      image.publicId !== req.uploadedMainImage?.publicId &&
      !(req.uploadedGalleryImages || []).some((galleryImage) => galleryImage.publicId === image.publicId),
  );

  if (legacyImages?.length) {
    if (!updates.mainImage && !property.mainImage && legacyImages[0]) {
      updates.mainImage = legacyImages[0];
      updates.galleryImages = [...(updates.galleryImages || property.galleryImages), ...legacyImages.slice(1)];
    } else {
      updates.galleryImages = [...(updates.galleryImages || property.galleryImages), ...legacyImages];
    }
  }

  const nextMainImage = Object.prototype.hasOwnProperty.call(updates, 'mainImage') ? updates.mainImage : property.mainImage;
  const nextGalleryImages = updates.galleryImages || property.galleryImages;
  updates.images = nextMainImage ? [nextMainImage, ...nextGalleryImages] : nextGalleryImages;

  const updated = await Property.findByIdAndUpdate(req.params.id, updates, {
    returnDocument: 'after',
    runValidators: true,
  });

  res.status(200).json({ success: true, data: updated });
});

export const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) throw new ApiError('Property not found', 404);

  await deleteCloudinaryImages(property.images);
  await property.deleteOne();

  res.status(200).json({ success: true, message: 'Property deleted successfully' });
});
