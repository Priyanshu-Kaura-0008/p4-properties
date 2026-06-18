import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import chandigarhImage from '../assets/locations/chandigarh.jpg';
import khararImage from '../assets/locations/kharar.jpg';
import kuraliImage from '../assets/locations/kurali.jpg';
import mohaliImage from '../assets/locations/mohali.jpg';
import newChandigarhImage from '../assets/locations/new_chandigarh.jpg';
import panchkulaExtensionImage from '../assets/locations/panchkula_extention.png';
import panchkulaImage from '../assets/locations/panchkula.jpg';
import rajpuraImage from '../assets/locations/rajpura.jpg';
import { COMPANY_INFO } from '../constants/companyInfo';

const locationCards = [
  {
    city: 'Chandigarh',
    description: 'A well-planned city offering premium residential and commercial opportunities.',
    image: chandigarhImage,
  },
  {
    city: 'Mohali',
    description: 'One of the fastest-growing investment destinations in the Tricity region.',
    image: mohaliImage,
  },
  {
    city: 'Panchkula',
    description: 'Known for its serene surroundings and upscale residential developments.',
    image: panchkulaImage,
  },
  {
    city: 'Kharar',
    description: 'A rapidly developing locality with excellent investment potential.',
    image: khararImage,
  },
  {
    city: 'Kurali',
    description: 'An emerging real estate hotspot offering affordability and growth.',
    image: kuraliImage,
  },
  {
    city: 'Panchkula Extension',
    description: 'A promising corridor with modern infrastructure and premium projects.',
    image: panchkulaExtensionImage,
  },
  {
    city: 'New Chandigarh',
    description: 'The future of luxury living with world-class urban planning.',
    image: newChandigarhImage,
  },
  {
    city: 'Rajpura',
    description: 'A strategic location attracting residential and industrial investments.',
    image: rajpuraImage,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const propertyLink = (city) => `/properties?location=${encodeURIComponent(city)}`;

export default function LocationsSection() {
  return (
    <motion.section
      id="locations"
      className="relative overflow-hidden bg-ivory py-10 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.13),transparent_34%),radial-gradient(circle_at_15%_85%,rgba(17,17,17,0.08),transparent_30%)]" />
      <div className="container-p4 relative z-10">
        <motion.div variants={cardVariants} className="mx-auto mb-8 max-w-4xl text-center md:mb-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Prime Coverage</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
            Explore Prime Locations
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted md:text-lg">
            Discover exceptional residential and commercial opportunities across the Tricity and surrounding investment
            destinations.
          </p>
        </motion.div>

        <motion.div className="w-full max-w-full overflow-hidden px-1 pb-2 sm:px-2 lg:hidden" variants={sectionVariants}>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.2}
            spaceBetween={16}
            centeredSlides
            loop
            speed={900}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
              },
            }}
          >
            {locationCards.map((location) => (
              <SwiperSlide key={location.city} className="flex h-auto">
                <LocationCard location={location} compact />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div className="hidden gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-4" variants={sectionVariants}>
          {locationCards.map((location) => (
            <LocationCard key={location.city} location={location} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function LocationCard({ location, compact = false }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className={`group relative h-full w-full overflow-hidden rounded-2xl border border-white/25 bg-night shadow-soft transition-shadow hover:shadow-premium ${
        compact ? 'min-h-[340px]' : 'min-h-[390px]'
      }`}
    >
      <img
        src={location.image}
        alt={`${location.city} real estate opportunities`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/12" />
      <div className={`relative z-10 flex h-full flex-col justify-end text-white ${compact ? 'min-h-[340px] p-5' : 'min-h-[390px] p-6'}`}>
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gold">
          <FaMapMarkerAlt aria-hidden="true" />
          {COMPANY_INFO.companyName}
        </p>
        <h3 className="font-display text-2xl font-bold leading-tight md:text-3xl">{location.city}</h3>
        <p className={`${compact ? 'mt-2 min-h-[72px] text-sm leading-6' : 'mt-3 min-h-[84px] leading-7'} text-white/78`}>{location.description}</p>
        <Link
          to={propertyLink(location.city)}
          className="mt-6 inline-flex w-fit rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-xl transition-all hover:border-gold hover:bg-gold hover:text-night hover:shadow-[0_0_30px_rgba(212,175,55,0.42)]"
        >
          Explore Properties
        </Link>
      </div>
    </motion.article>
  );
}
