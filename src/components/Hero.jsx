import { motion } from 'framer-motion';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { heroSlides } from '../data/siteData';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-night">
      {/* Hero image slider */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        speed={1100}
        autoplay={{ delay: 4300, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="absolute inset-0 h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.image}>
            <img src={slide.image} alt={slide.alt} loading="eager" decoding="async" className="h-full w-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute inset-0 bg-night/58" />

      <div className="container-p4 relative z-10 flex min-h-screen items-center pb-32 pt-28">
        <motion.div
          className="max-w-4xl text-white"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-gold">Premium Real Estate Advisory</p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-7xl lg:text-8xl">
            Discover Exceptional Real Estate Opportunities
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
            Luxury Homes. Strategic Investments. Trusted Guidance Across Tricity.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#properties"
              className="bg-gold px-7 py-4 text-center text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-white"
            >
              Explore Properties
            </a>
            <a
              href="#contact-us"
              className="border border-white/40 px-7 py-4 text-center text-sm font-extrabold uppercase tracking-[0.16em] text-white transition-colors hover:border-gold hover:text-gold"
            >
              Schedule Site Visit
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#search"
        aria-label="Scroll to property search"
        className="absolute bottom-9 left-1/2 z-20 hidden h-12 w-7 -translate-x-1/2 rounded-full border border-white/50 p-1 md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <span className="block h-2 w-2 rounded-full bg-gold" />
      </motion.a>
    </section>
  );
}
