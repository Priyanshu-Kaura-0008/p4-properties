import { FaChartLine, FaCity, FaRoad, FaRupeeSign } from 'react-icons/fa';
import { DetailSection } from './PropertyFeatures';

const highlights = [
  { title: 'Rapid Infrastructure Growth', icon: FaCity },
  { title: 'Excellent Connectivity', icon: FaRoad },
  { title: 'High Rental Demand', icon: FaRupeeSign },
  { title: 'Strong Appreciation Potential', icon: FaChartLine },
];

export default function InvestmentHighlights() {
  return (
    <DetailSection title="Why Invest Here?">
      <div className="grid gap-5 sm:grid-cols-2">
        {highlights.map((highlight) => {
          const Icon = highlight.icon;
          return (
            <article key={highlight.title} className="rounded-md border border-ink/10 bg-ivory p-6 transition-all hover:-translate-y-1 hover:border-gold">
              <Icon className="mb-5 text-2xl text-gold" aria-hidden="true" />
              <h3 className="font-display text-2xl font-bold text-ink">{highlight.title}</h3>
              <p className="mt-3 leading-7 text-muted">
                Carefully selected market fundamentals support long-term ownership confidence.
              </p>
            </article>
          );
        })}
      </div>
    </DetailSection>
  );
}
