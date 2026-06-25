import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FaExpand, FaTimes } from 'react-icons/fa';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
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

  useEffect(() => {
    if (!fullscreenImage) return undefined;

    const scrollY = window.scrollY;
    const previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      document.body.style.overflow = previousBodyStyles.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [fullscreenImage]);

  return (
    <section className="property-gallery w-full max-w-full overflow-x-hidden bg-night pb-4 pt-20 sm:pb-5">
      <div className="property-detail-container min-w-0">
        <div className="relative w-full max-w-full min-w-0 overflow-hidden bg-night shadow-[0_26px_90px_rgba(0,0,0,0.34)] sm:rounded-lg">
          <Swiper
            modules={[Autoplay, Navigation, Thumbs]}
            navigation
            loop={images.length > 1}
            autoplay={
              images.length > 1
                ? { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }
                : false
            }
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="property-main-swiper h-[56vh] min-h-[320px] w-full max-w-full overflow-hidden sm:min-h-[380px] md:h-[68vh] md:max-h-[760px] md:min-h-[500px]"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`${image}-${index}`} className="min-w-0 overflow-hidden bg-night">
                <button
                  type="button"
                  className="relative block h-full w-full max-w-full overflow-hidden"
                  onClick={() => setFullscreenImage(image)}
                  aria-label={`Open ${property.title} image ${index + 1} in full screen`}
                >
                  <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 h-full w-full scale-105 object-cover opacity-30 blur-xl"
                  />
                  <motion.img
                    src={image}
                    alt={`${property.title} gallery image ${index + 1}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="relative z-[1] h-full w-full max-w-full object-contain"
                    initial={{ scale: 1.04, opacity: 0.9 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.75 }}
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/80 via-night/5 to-night/30" />
          <div className="absolute bottom-5 left-4 right-4 z-10 max-w-[calc(100%-2rem)] overflow-hidden md:bottom-8 md:left-8 md:right-8 md:max-w-5xl">
            <div className="mb-3 flex max-w-full flex-wrap gap-2 sm:mb-4">
              {property.featured && <Badge label="Featured" gold />}
              <Badge label={property.status || 'Available'} />
              <Badge label={property.propertyType} />
            </div>
            <h1 className="max-w-5xl break-words font-display text-3xl font-bold leading-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.55)] sm:text-4xl md:text-6xl">{property.title}</h1>
          </div>

          <button
            type="button"
            onClick={() => setFullscreenImage(images[0])}
            className="absolute right-3 top-4 z-10 flex min-h-11 max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-xs font-bold text-night shadow-soft transition-colors hover:bg-gold sm:right-5 sm:top-6 sm:min-h-12 sm:px-4 sm:text-sm"
          >
            <FaExpand aria-hidden="true" />
            View Gallery
          </button>
        </div>

        <div className="min-w-0 max-w-full overflow-x-hidden pt-3 sm:pt-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Thumbs]}
            spaceBetween={10}
            slidesPerView="auto"
            freeMode
            watchSlidesProgress
            className="property-thumb-swiper w-full max-w-full overflow-hidden"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`${image}-thumb-${index}`} className="!w-[96px] min-w-0 sm:!w-[130px] lg:!w-[150px]">
                <button className="aspect-[4/3] w-full max-w-full overflow-hidden rounded-lg border border-white/15 bg-white/5 transition-colors hover:border-gold" type="button">
                  <img src={image} alt={`${property.title} thumbnail ${index + 1}`} loading="lazy" decoding="async" className="h-full w-full max-w-full object-cover" />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex h-[100dvh] w-screen max-w-[100vw] items-center justify-center overflow-hidden bg-night/95 p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Full screen property image viewer"
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-night sm:right-5 sm:top-5"
              onClick={() => setFullscreenImage(null)}
              aria-label="Close full screen image viewer"
            >
              <FaTimes aria-hidden="true" />
            </button>
            <img
              src={fullscreenImage}
              alt="Full screen property view"
              decoding="async"
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Badge({ label, gold = false }) {
  return (
    <span className={`${gold ? 'bg-gold text-night' : 'bg-white/90 text-ink'} max-w-full break-words rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.14em]`}>
      {label}
    </span>
  );
}
