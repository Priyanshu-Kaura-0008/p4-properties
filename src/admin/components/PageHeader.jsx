export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold">P4 Properties Admin</p>
        <h2 className="mt-2 font-display text-4xl font-bold text-white">{title}</h2>
        {subtitle && <p className="mt-2 text-white/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
