import { motion } from 'framer-motion';
import { FaDirections, FaMapMarkerAlt } from 'react-icons/fa';

export default function PropertyLocation({ property }) {
  const locationText = [property.address, property.location || property.locality, property.city].filter(Boolean).join(', ');
  const query = encodeURIComponent(locationText);
  const mapUrl = property.googleMapLink?.includes('/embed')
    ? property.googleMapLink
    : `https://maps.google.com/maps?q=${query}&z=13&output=embed`;
  const directionsUrl = property.googleMapLink || `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <motion.section
      className="rounded-lg border border-ink/10 bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:p-7 lg:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Location</h2>
      <p className="mt-3 flex min-w-0 items-start gap-2 break-words leading-8 text-muted">
        <FaMapMarkerAlt className="mt-1 shrink-0 text-gold" aria-hidden="true" />
        {locationText}
      </p>
      <div className="mt-6 overflow-hidden rounded-lg border border-ink/10">
        <iframe
          title={`Map location for ${property.title}`}
          src={mapUrl}
          className="h-[300px] w-full sm:h-[380px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-lg bg-night px-5 py-3 text-center text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:bg-gold hover:text-night sm:px-6 sm:text-sm sm:tracking-[0.14em]"
      >
        <FaDirections aria-hidden="true" />
        Get Directions
      </a>
    </motion.section>
  );
}
