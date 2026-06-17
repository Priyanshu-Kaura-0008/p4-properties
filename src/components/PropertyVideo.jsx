import { DetailSection } from './PropertyFeatures';

export default function PropertyVideo({ videoUrl }) {
  return (
    <DetailSection title="Experience the Property">
      <div className="aspect-video overflow-hidden rounded-md border border-ink/10 bg-night">
        <iframe
          title="Property video tour"
          src={videoUrl}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </DetailSection>
  );
}
