import { motion } from 'framer-motion';
import { FaDraftingCompass } from 'react-icons/fa';

export default function PropertyFloorPlans({ property }) {
  return (
    <motion.section
      className="rounded-2xl border border-ink/10 bg-white/85 p-7 shadow-soft backdrop-blur-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-3xl font-bold text-ink">Floor Plans</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-gold/25 bg-ivory p-6">
          <FaDraftingCompass className="text-3xl text-gold" aria-hidden="true" />
          <h3 className="mt-4 font-display text-2xl font-bold text-ink">Custom Plan Available</h3>
          <p className="mt-3 leading-8 text-muted">
            Floor plans and layout documentation for {property.title} can be shared by our advisory team after a quick
            consultation.
          </p>
        </div>
        <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-white">
          <p className="px-6 text-center text-sm font-bold uppercase tracking-[0.16em] text-muted">
            Layout preview available on request
          </p>
        </div>
      </div>
    </motion.section>
  );
}
