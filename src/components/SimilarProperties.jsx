import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropertyCard from './PropertyCard';
import SectionHeading from './SectionHeading';

export default function SimilarProperties({ properties }) {
  return (
    <section className="bg-ivory py-24">
      <div className="container-p4">
        <SectionHeading eyebrow="Similar Listings" title="You May Also Like" />
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1180: { slidesPerView: 3 } }}
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <PropertyCard property={property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
