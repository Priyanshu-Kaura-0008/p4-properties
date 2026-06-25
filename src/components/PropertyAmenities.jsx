import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

export default function PropertyAmenities({ amenities = [] }) {
  return (
    <motion.section
      className="rounded-lg border border-ink/10 bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:p-7 lg:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Amenities</h2>
      {amenities.length ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex min-h-16 min-w-0 items-start gap-3 rounded-lg border border-gold/25 bg-ivory/75 p-4">
              <FaCheckCircle className="shrink-0 text-gold" aria-hidden="true" />
              <p className="overflow-wrap-anywhere font-bold leading-6 text-ink">{amenity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 leading-8 text-muted">Amenity details are available on request.</p>
      )}
    </motion.section>
  );
}
