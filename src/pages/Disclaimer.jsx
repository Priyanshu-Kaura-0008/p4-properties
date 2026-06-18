import LegalPageLayout from './LegalPageLayout';

const sections = [
  {
    title: 'Marketing Information Disclaimer',
    body: [
      'The information on this website is provided for marketing, advisory, and general informational purposes. It should not be treated as legal, financial, tax, or investment advice.',
    ],
  },
  {
    title: 'Property Images Disclaimer',
    body: [
      'Property images, renderings, walkthrough visuals, and lifestyle photographs may be representative. Actual property appearance, layout, fittings, views, and surroundings may vary.',
    ],
  },
  {
    title: 'Pricing Disclaimer',
    body: [
      'Prices, rental values, payment plans, offers, brokerage, taxes, registration charges, and other costs are subject to change and must be verified before any transaction.',
    ],
  },
  {
    title: 'Project Availability Disclaimer',
    body: [
      'Property and project availability may change without notice due to sale, booking, withdrawal, construction stage, inventory updates, or developer decisions.',
    ],
  },
  {
    title: 'Investment Disclaimer',
    body: [
      'Real estate investment involves risk. Past market trends, projected returns, rental yields, or growth estimates do not guarantee future performance. Users should seek independent financial advice before investing.',
    ],
  },
  {
    title: 'Legal Disclaimer',
    body: [
      'Users should independently verify title, ownership, approvals, RERA status, CLU, zoning, possession timeline, and all legal documents before entering into any agreement.',
    ],
  },
];

export default function Disclaimer() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      description="Important disclaimers about property information, pricing, availability, images, investment decisions, and legal verification."
      canonical="/disclaimer"
      sections={sections}
    />
  );
}
