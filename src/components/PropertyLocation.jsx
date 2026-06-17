import { motion } from 'framer-motion';
import { FaDirections, FaMapMarkerAlt } from 'react-icons/fa';

export default function PropertyLocation({ property }) {
  const query = encodeURIComponent([property.address, property.locality, property.city].filter(Boolean).join(', '));
  const mapUrl = `https://maps.google.com/maps?q=${query}&z=13&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <motion.section
      className="rounded-2xl border border-ink/10 bg-white/85 p-7 shadow-soft backdrop-blur-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-3xl font-bold text-ink">Location</h2>
      <p className="mt-3 flex items-center gap-2 leading-8 text-muted">
        <FaMapMarkerAlt className="text-gold" aria-hidden="true" />
        {[property.address, property.locality, property.city].filter(Boolean).join(', ')}
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10">
        <iframe
          title={`Map location for ${property.title}`}
          src={mapUrl}
          className="h-[380px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-3 rounded-xl bg-night px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold hover:text-night"
      >
        <FaDirections aria-hidden="true" />
        Get Directions
      </a>
    </motion.section>
  );
}
