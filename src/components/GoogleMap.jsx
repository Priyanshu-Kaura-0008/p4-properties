import { FaDirections } from 'react-icons/fa';
import { DetailSection } from './PropertyFeatures';

export default function GoogleMap({ latitude, longitude, location }) {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=13&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <DetailSection title="Property Location">
      <div className="overflow-hidden rounded-md border border-ink/10">
        <iframe
          title={`Map location for ${location}`}
          src={mapUrl}
          className="h-[360px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-3 rounded-xl bg-night px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold hover:text-night"
      >
        <FaDirections aria-hidden="true" />
        Get Directions
      </a>
    </DetailSection>
  );
}
