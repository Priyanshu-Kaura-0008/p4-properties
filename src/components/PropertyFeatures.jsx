import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

export default function PropertyFeatures({ features }) {
  return (
    <DetailSection title="Property Features">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <motion.div
            key={feature}
            className="rounded-md border border-ink/10 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-gold/60"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheckCircle className="mb-4 text-gold" aria-hidden="true" />
            <p className="font-bold text-ink">{feature}</p>
          </motion.div>
        ))}
      </div>
    </DetailSection>
  );
}

export function DetailSection({ title, children }) {
  return (
    <section className="rounded-md bg-white p-7 shadow-soft">
      <h2 className="mb-7 font-display text-3xl font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}
