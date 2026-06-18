import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import propertyService from '../services/propertyService';
import 'swiper/css';

const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const formatPrice = (price) => {
  const value = Number(price);
  if (!Number.isFinite(value)) return 'Price on Request';
  if (value >= 10000000) return `Rs. ${(value / 10000000).toFixed(value % 10000000 === 0 ? 0 : 2)} Cr`;
  if (value >= 100000) return `Rs. ${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 2)} Lakh`;
  return `Rs. ${value.toLocaleString('en-IN')}`;
};

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    propertyService
      .getFeaturedProperties({ limit: 6 }, { signal: controller.signal })
      .then((data) => {
        setProperties(data.data || []);
        setError('');
      })
      .catch((requestError) => {
        if (requestError.name === 'CanceledError') return;
        setError('Unable to load featured properties right now.');
        setProperties([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <motion.section
      id="properties"
      className="relative overflow-hidden bg-night py-12 text-white md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />
      <div className="container-p4 relative z-10">
        <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Selected Portfolio</p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">Featured Properties</h2>
            <p className="mt-4 max-w-2xl leading-8 text-white/72">
              Handpicked residential and commercial opportunities from the P4 Properties portfolio.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold hover:text-night hover:shadow-[0_0_28px_rgba(212,175,55,0.35)] sm:w-fit"
          >
            Explore All
          </Link>
        </div>

        {loading ? (
          <FeaturedSkeleton />
        ) : error ? (
          <FeaturedState title="Featured properties could not load" message={error} />
        ) : properties.length === 0 ? (
          <FeaturedState
            title="No featured properties yet"
            message="Explore the complete P4 Properties portfolio for available opportunities."
          />
        ) : (
          <>
          <motion.div className="lg:hidden" variants={sectionVariants}>
            <Swiper slidesPerView={1.1} spaceBetween={16} aria-label="Featured properties slider">
              {properties.map((property) => (
                <SwiperSlide key={property._id} className="h-auto">
                  <FeaturedPropertyCard property={property} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
          <motion.div className="hidden gap-7 lg:grid lg:grid-cols-3" variants={sectionVariants}>
            {properties.map((property) => (
              <FeaturedPropertyCard key={property._id} property={property} />
            ))}
          </motion.div>
          </>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/properties"
            className="inline-flex rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night shadow-[0_0_30px_rgba(212,175,55,0.28)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_0_42px_rgba(212,175,55,0.48)]"
          >
            Explore All Properties
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

function FeaturedPropertyCard({ property }) {
  const image = property.mainImage?.url || property.images?.[0]?.url || fallbackImage;
  const location = [property.location || property.locality, property.city].filter(Boolean).join(', ');

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_32px_100px_rgba(212,175,55,0.2)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/72 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-night shadow-[0_0_28px_rgba(212,175,55,0.35)]">
          Featured
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/72">
          <FaMapMarkerAlt className="text-gold" aria-hidden="true" />
          {location || property.address || 'Prime Location'}
        </p>
        <h3 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl">{property.title}</h3>
        <p className="mt-3 text-xl font-extrabold text-gold sm:text-2xl">{formatPrice(property.price)}</p>
        <p className="mt-3 border-y border-white/15 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-white/78">
          {property.propertyType || property.category || 'Property'}
        </p>

        <Link
          to={`/properties/${property.slug}`}
          className="mt-auto inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-gold px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-night transition-all hover:bg-white hover:shadow-[0_0_34px_rgba(212,175,55,0.5)]"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}

function FeaturedSkeleton() {
  return (
    <div
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
      aria-label="Loading featured properties"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="w-[85vw] min-w-[85vw] max-w-[85vw] snap-start animate-pulse overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:w-auto lg:min-w-0 lg:max-w-none"
        >
          <div className="aspect-[4/3] bg-white/15" />
          <div className="space-y-4 p-6">
            <div className="h-4 w-2/3 rounded bg-white/15" />
            <div className="h-8 rounded bg-white/15" />
            <div className="h-7 w-1/2 rounded bg-white/15" />
            <div className="h-16 rounded bg-white/15" />
            <div className="h-12 rounded bg-white/15" />
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturedState({ title, message }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <h3 className="font-display text-3xl font-bold text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl leading-8 text-white/72">{message}</p>
      <Link
        to="/properties"
        className="mt-6 inline-flex rounded-xl bg-gold px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-night transition-all hover:bg-white hover:shadow-[0_0_34px_rgba(212,175,55,0.45)]"
      >
        Browse Properties
      </Link>
    </div>
  );
}
