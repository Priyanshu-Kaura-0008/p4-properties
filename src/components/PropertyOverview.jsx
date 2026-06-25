import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBath, FaBed, FaCar, FaHome, FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';

const formatPrice = (price) => {
  const value = Number(price);
  if (!Number.isFinite(value)) return 'Price on Request';
  if (value >= 10000000) return `Rs. ${(value / 10000000).toFixed(value % 10000000 === 0 ? 0 : 2)} Cr`;
  if (value >= 100000) return `Rs. ${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 2)} Lakh`;
  return `Rs. ${value.toLocaleString('en-IN')}`;
};

const formatLabel = (value) =>
  String(value || '-')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim();

export default function PropertyOverview({ property }) {
  const [expanded, setExpanded] = useState(false);
  const rawDescription = property.description || 'Property details are available on request.';
  const shouldClamp = rawDescription.length > 420;
  const description = !shouldClamp || expanded ? rawDescription : `${rawDescription.slice(0, 420)}...`;
  const location = [property.location || property.locality, property.city].filter(Boolean).map(formatLabel).join(', ');
  const address = formatLabel(property.address);

  return (
    <div className="grid gap-6 md:gap-8">
      <motion.header
        className="rounded-lg border border-ink/10 bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:p-7 lg:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <p className="flex min-w-0 items-start gap-2 break-words text-xs font-bold uppercase leading-6 tracking-[0.1em] text-gold sm:items-center sm:text-sm sm:tracking-[0.16em]">
          <FaMapMarkerAlt className="mt-1 shrink-0 sm:mt-0" aria-hidden="true" />
          {location || property.address}
        </p>
        <div className="mt-4 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <h2 className="overflow-wrap-anywhere font-display text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl">{formatLabel(property.title)}</h2>
            <p className="mt-3 max-w-3xl overflow-wrap-anywhere leading-7 text-muted">{address}</p>
          </div>
          <p className="shrink-0 text-2xl font-extrabold leading-tight text-gold sm:text-3xl">{formatPrice(property.price)}</p>
        </div>
      </motion.header>

      <motion.div
        className="grid grid-cols-2 items-stretch gap-3 rounded-lg border border-ink/10 bg-white/90 p-4 shadow-soft backdrop-blur-xl sm:gap-4 sm:p-5 lg:grid-cols-3 2xl:grid-cols-5"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <Fact icon={FaBed} label="Bedrooms" value={property.bedrooms || '-'} />
        <Fact icon={FaBath} label="Bathrooms" value={property.bathrooms || '-'} />
        <Fact icon={FaRulerCombined} label="Area" value={`${Number(property.area || property.landArea || 0).toLocaleString('en-IN')} ${formatLabel(property.areaUnit || 'Sq.ft.')}`} />
        <Fact icon={FaCar} label="Parking" value={property.parking || '-'} />
        <Fact icon={FaHome} label="Property Type" value={formatLabel(property.propertyType)} />
      </motion.div>

      <motion.section
        className="rounded-lg border border-ink/10 bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:p-7 lg:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Property Overview</h2>
        <p className="mt-4 max-w-3xl overflow-wrap-anywhere text-base leading-8 text-muted sm:text-lg sm:leading-9">{description}</p>
        {shouldClamp && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-5 text-sm font-extrabold uppercase tracking-[0.14em] text-gold"
            aria-expanded={expanded}
          >
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </motion.section>
    </div>
  );
}

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="flex h-full min-h-[112px] min-w-0 items-center gap-3 rounded-lg border border-ink/10 bg-ivory/75 p-3 sm:p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-night text-gold sm:h-12 sm:w-12">
        <Icon aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-muted sm:text-[11px] sm:tracking-[0.1em]">{label}</span>
        <span className="mt-1 block break-words text-sm font-bold leading-5 text-ink sm:text-base">{value}</span>
      </span>
    </div>
  );
}
