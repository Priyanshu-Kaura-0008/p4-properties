import { motion } from 'framer-motion';

export default function AdminCard({ title, value, icon: Icon, tone = 'dark' }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 shadow-[0_20px_60px_rgba(0,0,0,.28)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/50">{title}</p>
          <p className="mt-3 font-display text-4xl font-bold text-white">{value}</p>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl ${tone === 'gold' ? 'bg-gold text-night' : 'bg-night text-gold'}`}>
          <Icon aria-hidden="true" />
        </div>
      </div>
    </motion.article>
  );
}
