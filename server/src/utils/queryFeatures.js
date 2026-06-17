export function buildPropertyQuery(query) {
  const filter = {};
  const budgetRanges = {
    'Under Rs. 50 Lakhs': [0, 5000000],
    'Rs. 50 Lakhs - Rs. 1 Crore': [5000000, 10000000],
    'Rs. 1 Crore - Rs. 2 Crores': [10000000, 20000000],
    'Rs. 2 Crores - Rs. 5 Crores': [20000000, 50000000],
    'Above Rs. 5 Crores': [50000000, undefined],
  };

  ['locality', 'status', 'areaUnit', 'category'].forEach((field) => {
    if (query[field]) filter[field] = query[field];
  });

  const city = query.city || query.location;
  const propertyType = query.propertyType || query.type;

  if (city) filter.city = city;
  if (propertyType) filter.propertyType = propertyType;
  if (query.purpose) {
    filter.purpose = query.purpose === 'Buy' ? { $in: ['Buy', 'Sale', 'Sell'] } : query.purpose;
  }

  if (query.featured !== undefined) filter.featured = query.featured === 'true';
  if (query.bedrooms) filter.bedrooms = { $gte: Number(query.bedrooms) };
  if (query.bathrooms) filter.bathrooms = { $gte: Number(query.bathrooms) };
  if (query.parking) filter.parking = { $gte: Number(query.parking) };

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  if (!filter.price && budgetRanges[query.budget]) {
    const [minPrice, maxPrice] = budgetRanges[query.budget];
    filter.price = { $gte: minPrice };
    if (maxPrice !== undefined) filter.price.$lte = maxPrice;
  }

  if (query.minLandArea || query.maxLandArea) {
    filter.landArea = {};
    if (query.minLandArea) filter.landArea.$gte = Number(query.minLandArea);
    if (query.maxLandArea) filter.landArea.$lte = Number(query.maxLandArea);
  }

  if (query.amenity) filter.amenities = query.amenity;
  if (query.search) filter.$text = { $search: query.search };

  return filter;
}

export function getPagination(query) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function getSort(sort) {
  const allowed = {
    latest: '-createdAt',
    oldest: 'createdAt',
    priceLow: 'price',
    priceHigh: '-price',
    largestArea: '-landArea',
    featured: '-featured -createdAt',
  };

  return allowed[sort] || '-createdAt';
}
