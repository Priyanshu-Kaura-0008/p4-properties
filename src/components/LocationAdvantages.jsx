import { FaGraduationCap, FaHospital, FaPlane, FaShoppingBag } from 'react-icons/fa';
import { DetailSection } from './PropertyFeatures';

const categoryIcons = {
  Schools: FaGraduationCap,
  Hospitals: FaHospital,
  Shopping: FaShoppingBag,
  Airport: FaPlane,
};

export default function LocationAdvantages({ nearbyPlaces }) {
  return (
    <DetailSection title="Location Advantages">
      <div className="grid gap-5 md:grid-cols-2">
        {Object.entries(nearbyPlaces).map(([category, places]) => {
          const Icon = categoryIcons[category];
          return (
            <article key={category} className="rounded-md border border-ink/10 bg-ivory p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center bg-night text-gold">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="font-display text-2xl font-bold text-ink">{category}</h3>
              </div>
              <ul className="grid gap-3 text-sm font-semibold text-muted">
                {places.map((place) => (
                  <li key={place} className="border-l-2 border-gold pl-3">
                    {place}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </DetailSection>
  );
}
