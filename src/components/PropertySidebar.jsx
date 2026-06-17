import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const formatPrice = (price) => {
  const value = Number(price);
  if (!Number.isFinite(value)) return 'Price on Request';
  return `Rs. ${value.toLocaleString('en-IN')}`;
};

export default function PropertySidebar({ property }) {
  return (
    <aside className="sticky top-24 rounded-2xl border border-ink/10 bg-white/90 p-6 shadow-premium backdrop-blur-xl">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold">Private Advisory</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-ink">{formatPrice(property.price)}</h2>
      <p className="mt-3 leading-7 text-muted">{property.title}</p>
      <div className="mt-6 grid gap-3">
        <a href="#inquiry" className="rounded-xl bg-gold px-5 py-3 text-center text-sm font-extrabold uppercase tracking-[0.14em] text-night transition-colors hover:bg-night hover:text-white">
          Send Inquiry
        </a>
        <a href="#site-visit" className="rounded-xl border border-ink/15 px-5 py-3 text-center text-sm font-extrabold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:text-gold">
          Schedule Visit
        </a>
        <a href="tel:+918195002006" className="inline-flex items-center justify-center gap-2 rounded-xl bg-night px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold hover:text-night">
          <FaPhoneAlt aria-hidden="true" />
          Call Advisor
        </a>
        <a href={`https://wa.me/918195002006?text=${encodeURIComponent(`I am interested in ${property.title}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:text-gold">
          <FaWhatsapp aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </aside>
  );
}
