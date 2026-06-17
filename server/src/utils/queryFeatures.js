export function buildPropertyQuery(query) {
  const filter = {};
  const andConditions = [];
  const budgetRanges = {
    'Under Rs. 50 Lakhs': [0, 5000000],
    'Rs. 50 Lakhs - Rs. 1 Crore': [5000000, 10000000],
    'Rs. 1 Crore - Rs. 2 Crores': [10000000, 20000000],
    'Rs. 2 Crores - Rs. 5 Crores': [20000000, 50000000],
    'Above Rs. 5 Crores': [50000000, undefined],
  };

  ['status', 'areaUnit', 'category'].forEach((field) => {
    if (query[field]) filter[field] = query[field];
  });

  if (query.locality) filter.locality = query.locality;
  if (query.location) {
    andConditions.push({
      $or: [{ location: query.location }, { locality: query.location }, { city: query.location }],
    });
  }

  const city = query.city;
  const propertyType = query.propertyType || query.type;

  if (city) filter.city = city;
  if (propertyType) filter.propertyType = propertyType;
  if (query.purpose) {
    const purpose = String(query.purpose).toLowerCase();
    if (purpose === 'buy') filter.purpose = { $in: ['Buy', 'Sale', 'Sell'] };
    else if (purpose === 'rent') filter.purpose = 'Rent';
    else filter.purpose = query.purpose;
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

  const minArea = query.minArea || query.minLandArea;
  const maxArea = query.maxArea || query.maxLandArea;

  if (minArea || maxArea) {
    const areaRange = {};
    if (minArea) areaRange.$gte = Number(minArea);
    if (maxArea) areaRange.$lte = Number(maxArea);
    andConditions.push({ $or: [{ area: areaRange }, { landArea: areaRange }] });
  }

  if (query.amenity) filter.amenities = query.amenity;
  if (query.search) {
    const search = new RegExp(query.search, 'i');
    andConditions.push({ $or: [{ title: search }, { city: search }, { description: search }] });
  }

  if (andConditions.length) filter.$and = andConditions;

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
    largestArea: '-area',
    featured: '-featured -createdAt',
  };

  return allowed[sort] || '-createdAt';
}
