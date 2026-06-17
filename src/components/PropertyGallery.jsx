import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FaExpand, FaTimes } from 'react-icons/fa';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85';

export default function PropertyGallery({ property }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const images = useMemo(
    () => (property.images?.length ? property.images.map((image) => image.url) : [fallbackImage]),
    [property.images],
  );

  return (
    <section className="bg-night pt-20">
      <div className="relative">
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          loop={images.length > 1}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="h-[68vh] min-h-[430px] w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image}-${index}`}>
              <button
                type="button"
                className="block h-full w-full"
                onClick={() => setFullscreenImage(image)}
                aria-label={`Open ${property.title} image ${index + 1} in full screen`}
              >
                <motion.img
                  src={image}
                  alt={`${property.title} gallery image ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.04, opacity: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.75 }}
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-night/35" />
        <div className="absolute bottom-8 left-4 z-10 max-w-4xl md:left-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {property.featured && <Badge label="Featured" gold />}
            <Badge label={property.status || 'Available'} />
            <Badge label={property.propertyType} />
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">{property.title}</h1>
        </div>

        <button
          type="button"
          onClick={() => setFullscreenImage(images[0])}
          className="absolute right-5 top-6 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-night shadow-soft transition-colors hover:bg-gold"
        >
          <FaExpand aria-hidden="true" />
          View Gallery
        </button>
      </div>

      <div className="container-p4 py-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={12}
          slidesPerView={3.3}
          freeMode
          watchSlidesProgress
          breakpoints={{ 640: { slidesPerView: 5.4 }, 1024: { slidesPerView: 7.4 } }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image}-thumb-${index}`}>
              <button className="h-20 w-full overflow-hidden rounded-xl border border-white/15" type="button">
                <img src={image} alt={`${property.title} thumbnail ${index + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 z-[100] bg-night/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Full screen property image viewer"
          >
            <button
              type="button"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-night"
              onClick={() => setFullscreenImage(null)}
              aria-label="Close full screen image viewer"
            >
              <FaTimes aria-hidden="true" />
            </button>
            <img src={fullscreenImage} alt="Full screen property view" decoding="async" className="h-full w-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Badge({ label, gold = false }) {
  return (
    <span className={`${gold ? 'bg-gold text-night' : 'bg-white/90 text-ink'} rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em]`}>
      {label}
    </span>
  );
}
