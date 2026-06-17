import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaDownload, FaSearchPlus, FaTimes } from 'react-icons/fa';
import { DetailSection } from './PropertyFeatures';

export default function FloorPlans({ floorPlans }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <DetailSection title="Floor Plans">
      <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="group relative overflow-hidden rounded-md border border-ink/10"
          aria-label="Zoom floor plan"
        >
          <img src={floorPlans.image} alt="Property floor plan" loading="lazy" className="h-[360px] w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-night/0 text-3xl text-white transition-colors group-hover:bg-night/35">
            <FaSearchPlus aria-hidden="true" />
          </span>
        </button>
        <div className="grid content-center gap-4">
          <PlanFact label="Carpet Area" value={floorPlans.carpetArea} />
          <PlanFact label="Built-up Area" value={floorPlans.builtUpArea} />
          <PlanFact label="Super Area" value={floorPlans.superArea} />
          <a
            href={floorPlans.image}
            download
            className="mt-3 inline-flex items-center justify-center gap-3 bg-gold px-6 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-night transition-colors hover:bg-night hover:text-white"
          >
            <FaDownload aria-hidden="true" />
            Download Floor Plan
          </a>
        </div>
      </div>
      <AnimatePresence>
        {zoomed && (
          <motion.div className="fixed inset-0 z-[100] bg-night/92 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true">
            <button type="button" onClick={() => setZoomed(false)} className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center bg-white text-night" aria-label="Close floor plan">
              <FaTimes aria-hidden="true" />
            </button>
            <img src={floorPlans.image} alt="Zoomed floor plan" className="h-full w-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </DetailSection>
  );
}

function PlanFact({ label, value }) {
  return (
    <div className="border border-ink/10 bg-ivory p-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-ink">{value}</p>
    </div>
  );
}
