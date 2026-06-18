import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, light = false }) {
  return (
    <motion.div
      className="mx-auto mb-12 max-w-3xl text-center"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {eyebrow && (
        <p className={`mb-3 text-xs font-bold uppercase tracking-[0.28em] ${light ? 'text-gold' : 'text-gold'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-base leading-8 md:text-lg ${light ? 'text-white/72' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
