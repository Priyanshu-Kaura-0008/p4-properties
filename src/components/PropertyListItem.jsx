import { motion } from 'framer-motion';
import { FaBath, FaBed, FaCar, FaHeart, FaMapMarkerAlt, FaRulerCombined, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../constants/companyInfo';

export default function PropertyListItem({ property }) {
  return (
    <motion.article
      className="group grid overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-premium lg:grid-cols-[330px_1fr]"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <div className="relative min-h-[220px] overflow-hidden sm:min-h-[260px]">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {property.featured && (
          <span className="absolute left-4 top-4 bg-gold px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-night">
            Featured
          </span>
        )}
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-muted">
              <FaMapMarkerAlt className="text-gold" aria-hidden="true" />
              {property.location}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{property.title}</h3>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xl font-extrabold text-gold">{property.price}</p>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 text-ink hover:border-gold hover:text-gold"
              aria-label={`Save ${property.title}`}
            >
              <FaHeart aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="mt-4 max-w-3xl leading-8 text-muted">{property.description}</p>

        <div className="mt-5 grid gap-3 text-sm font-bold text-muted sm:grid-cols-2 md:grid-cols-4">
          <span className="flex items-center gap-2">
            <FaRulerCombined className="text-ink" aria-hidden="true" />
            {property.area} Sq. Ft.
          </span>
          <span className="flex items-center gap-2">
            <FaBed className="text-ink" aria-hidden="true" />
            {property.bedrooms || '-'} Beds
          </span>
          <span className="flex items-center gap-2">
            <FaBath className="text-ink" aria-hidden="true" />
            {property.bathrooms || '-'} Baths
          </span>
          <span className="flex items-center gap-2">
            <FaCar className="text-ink" aria-hidden="true" />
            {property.parking || '-'} Parking
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {property.amenities.slice(0, 4).map((amenity) => (
            <span key={amenity} className="bg-ivory px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to={`/properties/${property.slug || property.id}`}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-night px-6 py-3 text-center text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold hover:text-night"
          >
            View Details
          </Link>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-ink/15 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:text-gold"
          >
            <FaWhatsapp aria-hidden="true" />
            WhatsApp Inquiry
          </a>
        </div>
      </div>
    </motion.article>
  );
}
