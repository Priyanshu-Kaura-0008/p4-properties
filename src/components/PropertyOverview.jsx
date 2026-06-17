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

export default function PropertyOverview({ property }) {
  const [expanded, setExpanded] = useState(false);
  const shouldClamp = property.description?.length > 280;
  const description = !shouldClamp || expanded ? property.description : `${property.description.slice(0, 280)}...`;
  const location = [property.locality, property.city].filter(Boolean).join(', ');

  return (
    <div className="grid gap-8">
      <motion.header
        className="rounded-2xl border border-ink/10 bg-white/85 p-7 shadow-soft backdrop-blur-xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-gold">
          <FaMapMarkerAlt aria-hidden="true" />
          {location || property.address}
        </p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">{property.title}</h2>
            <p className="mt-3 text-muted">{property.address}</p>
          </div>
          <p className="text-3xl font-extrabold text-gold">{formatPrice(property.price)}</p>
        </div>
      </motion.header>

      <motion.div
        className="grid gap-4 rounded-2xl border border-ink/10 bg-white/85 p-5 shadow-soft backdrop-blur-xl sm:grid-cols-2 xl:grid-cols-5"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <Fact icon={FaBed} label="Bedrooms" value={property.bedrooms || '-'} />
        <Fact icon={FaBath} label="Bathrooms" value={property.bathrooms || '-'} />
        <Fact icon={FaRulerCombined} label="Area" value={`${Number(property.landArea || 0).toLocaleString('en-IN')} ${property.areaUnit || 'Sq.ft.'}`} />
        <Fact icon={FaCar} label="Parking" value={property.parking || '-'} />
        <Fact icon={FaHome} label="Property Type" value={property.propertyType} />
      </motion.div>

      <motion.section
        className="rounded-2xl border border-ink/10 bg-white/85 p-7 shadow-soft backdrop-blur-xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl font-bold text-ink">Property Overview</h2>
        <p className="mt-4 leading-8 text-muted">{description}</p>
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
    <div className="flex items-center gap-4 rounded-xl border border-ink/10 bg-ivory/70 p-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-night text-gold">
        <Icon aria-hidden="true" />
      </span>
      <span>
        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted">{label}</span>
        <span className="mt-1 block font-bold text-ink">{value}</span>
      </span>
    </div>
  );
}
