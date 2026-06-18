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
    () => {
      const gallery = [
        property.mainImage?.url,
        ...(property.galleryImages || []).map((image) => image.url),
        ...(property.images || []).map((image) => image.url),
      ].filter(Boolean);
      return gallery.length ? [...new Set(gallery)] : [fallbackImage];
    },
    [property.galleryImages, property.images, property.mainImage],
  );

  return (
    <section className="bg-night pt-20">
      <div className="relative">
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          loop={images.length > 1}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="h-[58vh] min-h-[360px] w-full md:h-[68vh] md:min-h-[430px]"
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
        <div className="absolute bottom-6 left-4 right-4 z-10 max-w-4xl md:bottom-8 md:left-8 md:right-auto">
          <div className="mb-4 flex flex-wrap gap-2">
            {property.featured && <Badge label="Featured" gold />}
            <Badge label={property.status || 'Available'} />
            <Badge label={property.propertyType} />
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">{property.title}</h1>
        </div>

        <button
          type="button"
          onClick={() => setFullscreenImage(images[0])}
          className="absolute right-4 top-5 z-10 flex min-h-12 items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-night shadow-soft transition-colors hover:bg-gold md:right-5 md:top-6"
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
              <button className="h-16 w-full overflow-hidden rounded-xl border border-white/15 md:h-20" type="button">
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
    <span className={`${gold ? 'bg-gold text-night' : 'bg-white/90 text-ink'} rounded-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em] sm:px-4 sm:text-xs sm:tracking-[0.14em]`}>
      {label}
    </span>
  );
}
