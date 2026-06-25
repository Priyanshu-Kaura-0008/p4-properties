import { motion } from 'framer-motion';
import { FaDraftingCompass } from 'react-icons/fa';

export default function PropertyFloorPlans({ property }) {
  return (
    <motion.section
      className="rounded-lg border border-ink/10 bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:p-7 lg:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Floor Plans</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-gold/25 bg-ivory p-5 sm:p-6">
          <FaDraftingCompass className="text-3xl text-gold" aria-hidden="true" />
          <h3 className="mt-4 font-display text-xl font-bold text-ink sm:text-2xl">Custom Plan Available</h3>
          <p className="mt-3 leading-8 text-muted">
            Floor plans and layout documentation for {property.title} can be shared by our advisory team after a quick
            consultation.
          </p>
        </div>
        <div className="flex min-h-56 items-center justify-center rounded-lg border border-dashed border-ink/15 bg-white sm:min-h-64">
          <p className="px-5 text-center text-xs font-bold uppercase leading-6 tracking-[0.1em] text-muted sm:text-sm sm:tracking-[0.14em]">
            Layout preview available on request
          </p>
        </div>
      </div>
    </motion.section>
  );
}
