import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import chandigarhImage from '../assets/locations/chandigarh.jpg';
import khararImage from '../assets/locations/kharar.jpg';
import kuraliImage from '../assets/locations/kurali.jpg';
import mohaliImage from '../assets/locations/mohali.jpg';
import newChandigarhImage from '../assets/locations/new_chandigarh.jpg';
import panchkulaExtensionImage from '../assets/locations/panchkula_extention.png';
import panchkulaImage from '../assets/locations/panchkula.jpg';
import rajpuraImage from '../assets/locations/rajpura.jpg';

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
      className="relative overflow-hidden bg-ivory py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.13),transparent_34%),radial-gradient(circle_at_15%_85%,rgba(17,17,17,0.08),transparent_30%)]" />
      <div className="container-p4 relative z-10">
        <motion.div variants={cardVariants} className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Prime Coverage</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
            Explore Prime Locations
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted">
            Discover exceptional residential and commercial opportunities across the Tricity and surrounding investment
            destinations.
          </p>
        </motion.div>

        <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" variants={sectionVariants}>
          {locationCards.map((location) => (
            <LocationCard key={location.city} location={location} />
          ))}
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="mx-auto mt-14 max-w-3xl rounded-2xl border border-white/70 bg-white/75 p-8 text-center shadow-soft backdrop-blur-xl"
        >
          <p className="font-display text-2xl font-bold text-ink">Can&apos;t decide where to invest?</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-xl bg-night px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-soft transition-all hover:-translate-y-1 hover:bg-gold hover:text-night hover:shadow-premium"
          >
            Talk to Our Experts
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function LocationCard({ location }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="group relative min-h-[390px] overflow-hidden rounded-2xl border border-white/25 bg-night shadow-soft transition-shadow hover:shadow-premium"
    >
      <img
        src={location.image}
        alt={`${location.city} real estate opportunities`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/12" />
      <div className="relative z-10 flex h-full min-h-[390px] flex-col justify-end p-6 text-white">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gold">
          <FaMapMarkerAlt aria-hidden="true" />
          P4 Properties
        </p>
        <h3 className="font-display text-3xl font-bold leading-tight">{location.city}</h3>
        <p className="mt-3 min-h-[84px] leading-7 text-white/78">{location.description}</p>
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
