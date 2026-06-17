export default function StatusBadge({ value }) {
  const normalized = String(value || 'available').toLowerCase();
  const styles = normalized.includes('pending')
    ? 'bg-gold/15 text-gold border-gold/25'
    : normalized.includes('closed') || normalized.includes('completed') || normalized.includes('approved') || normalized.includes('published')
      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
      : normalized.includes('draft') || normalized.includes('cancelled') || normalized.includes('rejected')
        ? 'bg-red-500/10 text-red-300 border-red-500/25'
        : 'bg-white/10 text-white/80 border-white/15';

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] ${styles}`}>{value}</span>;
}
