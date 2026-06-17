import { propertyListings } from './properties';

const galleryImages = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85',
  'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1800&q=85',
];

const defaultFeatures = [
  'Modular Kitchen',
  'Air Conditioning',
  'Power Backup',
  'Lift Access',
  'Security System',
  'Reserved Parking',
  'Balcony',
  'Servant Room',
  'Premium Flooring',
  'Video Door Phone',
];

const defaultAmenities = [
  'Clubhouse',
  'Swimming Pool',
  'Gymnasium',
  "Children's Play Area",
  'Jogging Track',
  'Landscaped Gardens',
  'Indoor Games',
  'Community Hall',
  '24x7 Security',
  'CCTV Surveillance',
];

const nearbyPlaces = {
  Schools: ['Delhi Public School - 5 mins', 'Gurukul World School - 8 mins'],
  Hospitals: ['Fortis Hospital - 10 mins', 'Max Hospital - 12 mins'],
  Shopping: ['CP67 Mall - 7 mins', 'VR Punjab - 12 mins'],
  Airport: ['Chandigarh International Airport - 15 mins'],
};

const coordinates = {
  Chandigarh: [30.7333, 76.7794],
  Mohali: [30.7046, 76.7179],
  Panchkula: [30.6942, 76.8606],
  Kharar: [30.7463, 76.6469],
  Kurali: [30.8393, 76.5786],
  'Panchkula Extension': [30.7296, 76.8848],
  'New Chandigarh': [30.7691, 76.6833],
  Rajpura: [30.484, 76.595],
};

export const propertyDetails = propertyListings.map((property, index) => {
  const [latitude, longitude] = coordinates[property.city] || coordinates.Mohali;
  const similarProperties = propertyListings
    .filter((item) => item.id !== property.id && (item.city === property.city || item.category === property.category))
    .slice(0, 4)
    .map((item) => item.id);

  return {
    ...property,
    propertyType: property.type,
    status: property.purpose === 'Sell' ? 'For Sale' : 'For Sale',
    description:
      `${property.description} This thoughtfully designed property offers spacious planning, modern finishes, and excellent connectivity to key destinations. Located in one of ${property.city}'s most relevant real estate corridors, it provides an exceptional blend of comfort, convenience, and investment potential for discerning buyers.`,
    features: defaultFeatures,
    amenities: Array.from(new Set([...property.amenities, ...defaultAmenities])),
    floorPlans: {
      image:
        'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1400&q=85',
      carpetArea: `${Math.max(property.area - 350, 500)} Sq. Ft.`,
      builtUpArea: `${Math.max(property.area - 150, 650)} Sq. Ft.`,
      superArea: `${property.area} Sq. Ft.`,
    },
    nearbyPlaces,
    gallery: galleryImages.slice(index % 3, index % 3 + 8).concat(galleryImages.slice(0, index % 3)).slice(0, 9),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    latitude,
    longitude,
    similarProperties,
  };
});

export const getPropertyDetailsById = (id) => propertyDetails.find((property) => property.id === id);
