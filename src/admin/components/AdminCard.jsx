import { motion } from 'framer-motion';

export default function AdminCard({ title, value, icon: Icon, tone = 'dark' }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-5 shadow-[0_20px_60px_rgba(0,0,0,.28)] sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/50">{title}</p>
          <p className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{value}</p>
        </div>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg sm:h-14 sm:w-14 sm:text-xl ${tone === 'gold' ? 'bg-gold text-night' : 'bg-night text-gold'}`}>
          <Icon aria-hidden="true" />
        </div>
      </div>
    </motion.article>
  );
}
