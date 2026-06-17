import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

export default function PropertyAmenities({ amenities = [] }) {
  return (
    <motion.section
      className="rounded-2xl border border-ink/10 bg-white/85 p-7 shadow-soft backdrop-blur-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-3xl font-bold text-ink">Amenities</h2>
      {amenities.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-4 rounded-xl border border-gold/25 bg-ivory/70 p-5">
              <FaCheckCircle className="text-gold" aria-hidden="true" />
              <p className="font-bold text-ink">{amenity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 leading-8 text-muted">Amenity details are available on request.</p>
      )}
    </motion.section>
  );
}
