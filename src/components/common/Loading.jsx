export default function Loading({ label = 'Loading...' }) {
  return (
    <div className="flex min-h-[240px] items-center justify-center text-center">
      <div>
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
      </div>
    </div>
  );
}
