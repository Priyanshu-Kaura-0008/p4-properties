import { motion } from 'framer-motion';
import { FaCar, FaHeart, FaShareAlt, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { icons } from '../data/siteData';

const BedIcon = icons.bed;
const BathIcon = icons.bath;
const RulerIcon = icons.ruler;
const LocationIcon = icons.location;

export default function PropertyCard({ property }) {
  if (property.id) {
    return <ListingPropertyCard property={property} />;
  }

  return (
    <motion.article
      className="group overflow-hidden rounded-md border border-ink/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-gold/60 hover:shadow-premium"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted">
          <LocationIcon className="text-gold" aria-hidden="true" />
          {property.location}
        </div>
        <h3 className="font-display text-2xl font-bold text-ink">{property.title}</h3>
        <p className="mt-2 text-xl font-extrabold text-gold">{property.price}</p>
        <div className="mt-5 grid grid-cols-3 gap-3 border-y border-ink/10 py-4 text-sm font-semibold text-muted">
          <span className="flex items-center gap-2">
            <RulerIcon className="text-ink" aria-hidden="true" />
            {property.area}
          </span>
          <span className="flex items-center gap-2">
            <BedIcon className="text-ink" aria-hidden="true" />
            {property.beds || '-'}
          </span>
          <span className="flex items-center gap-2">
            <BathIcon className="text-ink" aria-hidden="true" />
            {property.baths || '-'}
          </span>
        </div>
        <button className="mt-6 w-full border border-ink px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-colors group-hover:border-gold group-hover:bg-gold">
          View Details
        </button>
      </div>
    </motion.article>
  );
}

function ListingPropertyCard({ property }) {
  return (
    <motion.article
      className="group overflow-hidden rounded-md border border-ink/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-gold/60 hover:shadow-premium"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.58 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {property.featured && (
            <span className="bg-gold px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-night">
              Featured
            </span>
          )}
          <span className="bg-night/85 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-white">
            {property.category}
          </span>
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-ink shadow-soft transition-colors hover:bg-gold"
            aria-label={`Save ${property.title}`}
          >
            <FaHeart aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-ink shadow-soft transition-colors hover:bg-gold"
            aria-label={`Share ${property.title}`}
          >
            <FaShareAlt aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted">
          <LocationIcon className="text-gold" aria-hidden="true" />
          {property.location}
        </p>
        <h3 className="font-display text-2xl font-bold leading-tight text-ink">{property.title}</h3>
        <p className="mt-2 text-xl font-extrabold text-gold">{property.price}</p>
        <p className="mt-3 line-clamp-2 leading-7 text-muted">{property.description}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-ink/10 py-4 text-sm font-semibold text-muted">
          <span className="flex items-center gap-2">
            <RulerIcon className="text-ink" aria-hidden="true" />
            {property.area} Sq. Ft.
          </span>
          <span className="flex items-center gap-2">
            <BedIcon className="text-ink" aria-hidden="true" />
            {property.bedrooms || '-'} Beds
          </span>
          <span className="flex items-center gap-2">
            <BathIcon className="text-ink" aria-hidden="true" />
            {property.bathrooms || '-'} Baths
          </span>
          <span className="flex items-center gap-2">
            <FaCar className="text-ink" aria-hidden="true" />
            {property.parking || '-'} Parking
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            to={`/properties/${property.id}`}
            className="bg-night px-5 py-3 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:bg-gold hover:text-night"
          >
            View Details
          </Link>
          <a
            href={`https://wa.me/918195002006?text=I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
            className="inline-flex items-center justify-center gap-2 border border-ink/15 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-ink transition-colors hover:border-gold hover:text-gold"
          >
            <FaWhatsapp aria-hidden="true" />
            Inquiry
          </a>
        </div>
      </div>
    </motion.article>
  );
}
