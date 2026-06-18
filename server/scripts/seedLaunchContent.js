const API_BASE_URL = (process.env.P4_API_BASE_URL || 'https://p4-properties.onrender.com/api').replace(/\/$/, '');
const ADMIN_EMAIL = process.env.P4_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.P4_ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Set P4_ADMIN_EMAIL and P4_ADMIN_PASSWORD before running this script.');
  process.exit(1);
}

const image = (id, label, width = 1200, height = 850) => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=82`,
  publicId: `seed/${label}`,
  width,
  height,
});

const propertyImages = {
  villa: image('photo-1600585154340-be6161a56a0c', 'luxury-villa'),
  apartment: image('photo-1600607687939-ce8a6c25118c', 'premium-apartment'),
  floor: image('photo-1600566753190-17f0baa2a6c3', 'independent-floor'),
  plot: image('photo-1500382017468-9049fed747ef', 'residential-plot'),
  commercial: image('photo-1497366754035-f200968a6e72', 'commercial-office'),
  shop: image('photo-1441986300917-64674bd600d8', 'retail-shop'),
};

const commonAmenities = ['Verified Title', 'Prime Location', 'Wide Road Access', 'Loan Assistance'];

const properties = [
  ['Luxury Villa Near Aerocity Mohali', 42500000, 'Mohali', 'Aerocity', 'Villa', 'Residential', 'Buy', 3600, 5, 5, true, propertyImages.villa],
  ['Premium Apartment In Sector 88 Mohali', 14500000, 'Mohali', 'Sector 88', 'Apartment', 'Residential', 'Buy', 1850, 3, 3, true, propertyImages.apartment],
  ['Independent Floor In Sector 21 Chandigarh', 27500000, 'Chandigarh', 'Sector 21', 'Independent Floor', 'Residential', 'Buy', 2250, 4, 4, true, propertyImages.floor],
  ['Canal View Villa In New Chandigarh', 38500000, 'New Chandigarh', 'Eco City', 'Villa', 'Residential', 'Buy', 3200, 4, 5, true, propertyImages.villa],
  ['Luxury Home In Panchkula Sector 12', 31500000, 'Panchkula', 'Sector 12', 'Villa', 'Residential', 'Buy', 3000, 4, 4, true, propertyImages.villa],
  ['Corner SCO In Chandigarh Business Belt', 52000000, 'Chandigarh', 'Sector 34', 'SCO', 'Commercial', 'Buy', 1800, 0, 2, true, propertyImages.commercial],
  ['High Street Shop In Mohali Airport Road', 18500000, 'Mohali', 'Airport Road', 'Shop', 'Commercial', 'Buy', 640, 0, 1, true, propertyImages.shop],
  ['Commercial Land Parcel Near Rajpura Highway', 68000000, 'Rajpura', 'NH 44 Corridor', 'Commercial Land', 'Commercial', 'Buy', 12000, 0, 0, true, propertyImages.plot],
  ['Ready Apartment In Kharar Landran Road', 7200000, 'Kharar', 'Landran Road', 'Apartment', 'Residential', 'Buy', 1350, 3, 2, false, propertyImages.apartment],
  ['Residential Plot In Kurali Growth Zone', 3800000, 'Kurali', 'Morinda Road', 'Plot', 'Residential', 'Buy', 1800, 0, 0, false, propertyImages.plot],
  ['Office Space In Panchkula IT Belt', 16500000, 'Panchkula', 'Industrial Area Phase 1', 'Office', 'Commercial', 'Buy', 1450, 0, 2, false, propertyImages.commercial],
  ['Builder Floor Near Chandigarh University', 8400000, 'Kharar', 'Gharuan Road', 'Independent Floor', 'Residential', 'Buy', 1600, 3, 3, false, propertyImages.floor],
  ['Park Facing Apartment In Zirakpur Border', 9800000, 'Panchkula', 'Peer Muchalla', 'Apartment', 'Residential', 'Buy', 1550, 3, 2, false, propertyImages.apartment],
  ['Investment Plot In New Chandigarh Mullanpur', 12500000, 'New Chandigarh', 'Mullanpur', 'Plot', 'Residential', 'Buy', 2250, 0, 0, false, propertyImages.plot],
  ['Rental Office Near Chandigarh IT Park', 125000, 'Chandigarh', 'IT Park', 'Office', 'Commercial', 'Rent', 2200, 0, 2, false, propertyImages.commercial],
  ['Family Villa For Rent In Mohali Sector 79', 95000, 'Mohali', 'Sector 79', 'Villa', 'Residential', 'Rent', 2800, 4, 4, false, propertyImages.villa],
  ['Main Road Shop In Kharar Market', 7800000, 'Kharar', 'Main Bazaar', 'Shop', 'Commercial', 'Buy', 420, 0, 1, false, propertyImages.shop],
  ['SCO Site Near Kurali Highway', 12800000, 'Kurali', 'Highway Market', 'SCO', 'Commercial', 'Buy', 900, 0, 1, false, propertyImages.commercial],
  ['Low Rise Apartment In New Chandigarh', 11200000, 'New Chandigarh', 'Omaxe Phase 1', 'Apartment', 'Residential', 'Buy', 1725, 3, 3, false, propertyImages.apartment],
  ['Independent Floor In Panchkula Extension', 11800000, 'Panchkula', 'Sector 20 Extension', 'Independent Floor', 'Residential', 'Buy', 1650, 3, 3, false, propertyImages.floor],
  ['Commercial Office In Rajpura Town Centre', 9300000, 'Rajpura', 'Town Centre', 'Office', 'Commercial', 'Buy', 1100, 0, 1, false, propertyImages.commercial],
  ['Residential Plot Near Aerocity Extension', 9600000, 'Mohali', 'Aerocity Extension', 'Plot', 'Residential', 'Buy', 2000, 0, 0, false, propertyImages.plot],
  ['Premium Apartment In Chandigarh Sector 50', 16800000, 'Chandigarh', 'Sector 50', 'Apartment', 'Residential', 'Buy', 1900, 3, 3, false, propertyImages.apartment],
  ['Warehouse Land Near Rajpura Industrial Area', 45500000, 'Rajpura', 'Industrial Area', 'Commercial Land', 'Commercial', 'Buy', 9000, 0, 0, false, propertyImages.plot],
].map(([title, price, city, location, propertyType, category, purpose, area, bedrooms, bathrooms, featured, mainImage]) => ({
  title,
  price,
  city,
  location,
  locality: location,
  address: `${location}, ${city}`,
  propertyType,
  category,
  purpose,
  area,
  landArea: area,
  areaUnit: 'sq ft',
  bedrooms,
  bathrooms,
  parking: propertyType === 'Plot' || propertyType === 'Commercial Land' ? 0 : 1,
  featured,
  status: 'Available',
  amenities: category === 'Commercial'
    ? [...commonAmenities, 'High Visibility', 'Parking Access', 'Investment Advisory']
    : [...commonAmenities, 'Gated Community', 'Power Backup', 'Modular Kitchen'],
  mainImage,
  galleryImages: [],
  images: [mainImage],
  googleMapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location} ${city}`)}`,
  description: `${title} is a verified ${category.toLowerCase()} ${propertyType.toLowerCase()} opportunity in ${location}, ${city}. The listing is suitable for buyers looking for clear documentation, practical connectivity, and long-term value across the Tricity real estate market.`,
}));

const blogs = [
  ['Best Areas To Invest In New Chandigarh', 'Investment Guide', ['New Chandigarh', 'Property Investment'], 'New Chandigarh is emerging as one of the strongest planned real estate corridors around Tricity because of improving connectivity, organized sectors, and growing end-user demand.'],
  ['Luxury Villas In Mohali', 'Residential', ['Mohali', 'Luxury Homes'], 'Mohali offers premium villa communities around Aerocity, Sector 79, Sector 82, and Airport Road, making it a preferred choice for families seeking space and connectivity.'],
  ['Why Panchkula Is A Premium Residential Market', 'Residential', ['Panchkula', 'Luxury Homes'], 'Panchkula remains a stable residential market because of planned sectors, green surroundings, civic infrastructure, and strong access to Chandigarh.'],
  ['Commercial Property Investment Guide', 'Commercial', ['Commercial Property', 'Investment'], 'Commercial property investment should be evaluated on visibility, tenant demand, road width, parking, title clarity, and expected rental yield.'],
  ['SCO Investment Opportunities In Chandigarh', 'Commercial', ['SCO', 'Chandigarh'], 'SCO properties in Chandigarh continue to attract investors because they combine retail visibility, office usability, and limited supply in established sectors.'],
  ['Real Estate Trends In Tricity', 'Market Trends', ['Tricity', 'Real Estate'], 'The Tricity market is seeing demand across luxury homes, plotted developments, office spaces, and highway-linked commercial investments.'],
  ['Best Residential Sectors In Mohali', 'Residential', ['Mohali', 'Residential'], 'Sectors near Aerocity, Airport Road, IT City, and established civic pockets are among the most active residential zones in Mohali.'],
  ['New Chandigarh Growth Potential', 'Investment Guide', ['New Chandigarh', 'Growth'], 'New Chandigarh benefits from planned infrastructure, expanding residential supply, and its position between Chandigarh and the hills.'],
  ['Buying Vs Renting Property', 'Buyer Guide', ['Buy', 'Rent'], 'Buying and renting both make sense in different life stages. The right choice depends on holding period, cash flow, family plans, and investment goals.'],
  ['First-Time Property Buyer Guide', 'Buyer Guide', ['First Time Buyer', 'Documentation'], 'First-time buyers should verify title records, approvals, possession timeline, payment terms, loan eligibility, and resale potential before booking a property.'],
].map(([title, category, tags, excerpt], index) => ({
  title,
  excerpt,
  category,
  tags,
  published: true,
  coverImage: image(
    ['photo-1560518883-ce09059eeffa', 'photo-1600585154340-be6161a56a0c', 'photo-1600566753190-17f0baa2a6c3'][index % 3],
    `blog-${index + 1}`,
    1200,
    700,
  ),
  content: `${excerpt}\n\nFor serious buyers and investors, the first step is to define the purpose of purchase, preferred micro-market, budget range, and expected holding period. P4 Properties helps clients compare verified options across Chandigarh, Mohali, Panchkula, New Chandigarh, Kharar, Kurali, and Rajpura.\n\nA practical property decision should include document checks, location comparison, price benchmarking, construction quality review, and future exit potential. Working with an experienced advisory team reduces risk and helps buyers shortlist properties that match both lifestyle and investment goals.`,
}));

const testimonials = [
  ['Amanpreet Singh', 'Mohali', 'P4 Properties helped us shortlist a villa in Mohali with clear documentation and practical advice. The site visits were organized and transparent.', true],
  ['Neha Sharma', 'Chandigarh', 'The team understood our budget and showed only relevant homes. Their guidance during negotiation was very useful.', true],
  ['Rohit Bansal', 'Panchkula', 'Professional service from first call to final paperwork. We appreciated the honest comparison between different sectors.', true],
  ['Simran Kaur', 'New Chandigarh', 'We wanted an investment plot and P4 Properties explained the growth potential and risks clearly before we decided.', true],
  ['Gaurav Mehta', 'Kharar', 'Good local knowledge and quick follow-ups. The team helped us find a ready apartment near Landran Road.', true],
  ['Harpreet Gill', 'Kurali', 'The advisory was practical and not pushy. We found a plot option that matched our long-term plan.', false],
  ['Ankit Arora', 'Rajpura', 'P4 Properties helped us evaluate a commercial land parcel with proper location and document checks.', false],
  ['Priya Malhotra', 'Mohali', 'The property options were curated well. We saved a lot of time during our home search.', false],
  ['Vikram Sood', 'Chandigarh', 'Their commercial property advice was grounded in rental demand and market reality.', false],
  ['Meenal Verma', 'Panchkula', 'Very responsive team. Our site visit and follow-up questions were handled smoothly.', false],
].map(([name, location, review, featured], index) => ({
  name,
  location,
  rating: 5,
  review,
  featured,
  approved: true,
  image: image('photo-1500648767791-00dcc994a43e', `testimonial-${index + 1}`, 500, 500),
}));

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${options.method || 'GET'} ${path} failed: ${response.status} ${data.message || response.statusText}`);
  }
  return data;
};

const findByTitle = (items, title) => items.find((item) => item.title?.toLowerCase() === title.toLowerCase());
const findByName = (items, name) => items.find((item) => item.name?.toLowerCase() === name.toLowerCase());

const upsert = async ({ collection, items, listPath, createPath, updatePath, token, matcher }) => {
  const existing = await request(listPath, { token });
  const existingItems = existing.data || existing.data?.data || existing.data?.data?.data || [];
  let created = 0;
  let updated = 0;

  for (const item of items) {
    const match = matcher(existingItems, item);
    if (match?._id) {
      await request(updatePath(match._id), { method: 'PUT', token, body: JSON.stringify(item) });
      updated += 1;
    } else {
      await request(createPath, { method: 'POST', token, body: JSON.stringify(item) });
      created += 1;
    }
  }

  console.log(`${collection}: ${created} created, ${updated} updated`);
};

const main = async () => {
  const auth = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const token = auth.token;

  await upsert({
    collection: 'Properties',
    items: properties,
    listPath: '/properties?limit=100',
    createPath: '/properties',
    updatePath: (id) => `/properties/${id}`,
    token,
    matcher: (existing, item) => findByTitle(existing, item.title),
  });

  await upsert({
    collection: 'Blogs',
    items: blogs,
    listPath: '/blogs?limit=100',
    createPath: '/blogs',
    updatePath: (id) => `/blogs/${id}`,
    token,
    matcher: (existing, item) => findByTitle(existing, item.title),
  });

  await upsert({
    collection: 'Testimonials',
    items: testimonials,
    listPath: '/testimonials/admin?limit=100',
    createPath: '/testimonials',
    updatePath: (id) => `/testimonials/${id}`,
    token,
    matcher: (existing, item) => findByName(existing, item.name),
  });

  const featured = await request('/properties/featured?limit=8');
  console.log(`Featured properties available: ${featured.count || featured.data?.length || 0}`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
