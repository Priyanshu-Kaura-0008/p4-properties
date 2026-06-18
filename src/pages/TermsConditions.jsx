import LegalPageLayout from './LegalPageLayout';

const sections = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By accessing or using the P4 Properties website, submitting an inquiry, booking a site visit, or communicating with our team, you agree to these Terms & Conditions.',
    ],
  },
  {
    title: 'Property Information Accuracy',
    body: [
      'Property details, locations, specifications, images, sizes, amenities, and availability are provided for general information and marketing purposes. While we make reasonable efforts to keep information accurate, users should verify all details before making decisions.',
    ],
  },
  {
    title: 'Pricing Disclaimer',
    body: [
      'Prices, offers, payment plans, rental values, and investment projections may change without prior notice. Final pricing is subject to owner, builder, developer, or seller confirmation.',
    ],
  },
  {
    title: 'Third Party Projects',
    body: [
      'Some properties, projects, images, brochures, approvals, and specifications may be provided by third party builders, developers, sellers, or marketing partners. P4 Properties is not responsible for changes made by third parties.',
    ],
  },
  {
    title: 'User Responsibilities',
    body: [
      'Users are responsible for providing accurate contact information and for conducting independent verification, legal due diligence, financial checks, and documentation review before buying, renting, or investing in any property.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'P4 Properties shall not be liable for losses arising from reliance on website information, third party project details, pricing changes, availability changes, market fluctuation, or investment decisions made by users.',
    ],
  },
  {
    title: 'Contact Information',
    body: [
      'For questions about these terms, contact P4 Properties at info@p4properties.in.',
    ],
  },
];

export default function TermsConditions() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      description="Review the terms for using the P4 Properties website, property information, advisory services, and lead forms."
      canonical="/terms-conditions"
      sections={sections}
    />
  );
}
