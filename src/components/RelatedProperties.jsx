import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import PropertyCard from './PropertyCard';
import SectionHeading from './SectionHeading';

const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

const mapProperty = (property) => ({
  id: property.slug || property._id,
  title: property.title,
  price: Number(property.price).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }),
  location: [property.locality, property.city].filter(Boolean).join(', '),
  category: property.category || 'Residential',
  bedrooms: property.bedrooms,
  bathrooms: property.bathrooms,
  parking: property.parking,
  area: property.landArea,
  featured: property.featured,
  description: property.description,
  amenities: property.amenities || [],
  image: property.images?.[0]?.url || fallbackImage,
});

export default function RelatedProperties({ properties = [] }) {
  if (!properties.length) return null;

  return (
    <section className="bg-ivory py-24">
      <div className="container-p4">
        <SectionHeading eyebrow="Related Listings" title="Similar Properties" />
        <Swiper modules={[Navigation]} navigation spaceBetween={24} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1180: { slidesPerView: 3 } }}>
          {properties.map((property) => (
            <SwiperSlide key={property._id}>
              <PropertyCard property={mapProperty(property)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
