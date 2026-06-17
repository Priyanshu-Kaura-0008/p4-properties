export const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://p4properties.in').replace(/\/$/, '');

export const defaultSeo = {
  title: 'P4 Properties | Property Dealer Chandigarh & Tricity Real Estate Consultant',
  description:
    'P4 Properties is a trusted property consultant in Chandigarh for luxury homes, residential properties, commercial properties, and real estate investment across Mohali, Panchkula, New Chandigarh, Kharar, Kurali, and Rajpura.',
  keywords:
    'Property Dealer Chandigarh, Real Estate Mohali, Property Investment New Chandigarh, Luxury Homes Panchkula, Property Consultant Chandigarh, Residential Properties Mohali, Commercial Properties Chandigarh',
  image:
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
};

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export const locationSlug = (location) => location.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const realEstateAgentSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'P4 Properties',
  url: siteUrl,
  telephone: '+918195002006',
  email: 'info@p4properties.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chandigarh',
    addressRegion: 'Chandigarh',
    addressCountry: 'IN',
  },
  areaServed: ['Chandigarh', 'Mohali', 'Panchkula', 'Kharar', 'Kurali', 'Panchkula Extension', 'New Chandigarh', 'Rajpura'],
  description: defaultSeo.description,
  sameAs: ['https://instagram.com', 'https://facebook.com', 'https://linkedin.com', 'https://youtube.com'],
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const propertySchema = (property) => ({
  '@context': 'https://schema.org',
  '@type': 'Residence',
  name: property.title,
  description: property.description,
  image: property.images?.map((image) => image.url).filter(Boolean),
  url: absoluteUrl(`/properties/${property.slug}`),
  address: {
    '@type': 'PostalAddress',
    streetAddress: property.address || property.locality,
    addressLocality: property.city,
    addressRegion: property.city,
    addressCountry: 'IN',
  },
  floorSize: property.landArea
    ? {
        '@type': 'QuantitativeValue',
        value: property.landArea,
        unitText: property.areaUnit || 'Sq.ft',
      }
    : undefined,
  numberOfBedrooms: property.bedrooms,
  numberOfBathroomsTotal: property.bathrooms,
  offers: property.price
    ? {
        '@type': 'Offer',
        price: property.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: absoluteUrl(`/properties/${property.slug}`),
      }
    : undefined,
});
