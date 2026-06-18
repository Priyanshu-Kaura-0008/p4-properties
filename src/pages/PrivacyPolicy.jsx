import LegalPageLayout from './LegalPageLayout';
import { COMPANY_INFO } from '../constants/companyInfo';

const sections = [
  {
    title: 'Introduction',
    body: [
      `${COMPANY_INFO.companyName} is a real estate advisory business serving Chandigarh Tricity, including Chandigarh, Mohali, Panchkula, and nearby growth corridors. This Privacy Policy explains how we collect, use, protect, and manage information submitted through our website, contact forms, site visit forms, lead generation forms, and advertising campaigns.`,
    ],
  },
  {
    title: 'Information We Collect',
    body: [
      'We may collect your name, phone number, email address, preferred location, property budget, property type, message, site visit preferences, and details related to your real estate requirement.',
      'We may also collect technical information such as browser type, pages visited, approximate location, device information, and interaction data for website performance and marketing measurement.',
    ],
  },
  {
    title: 'How We Use Information',
    body: [
      'We use submitted information to contact you, understand your property requirements, share suitable residential or commercial options, schedule site visits, provide investment consultation, and improve our services.',
      'We may also use information to measure campaign performance, improve user experience, and maintain internal CRM records for follow-up.',
    ],
  },
  {
    title: 'Cookies & Analytics',
    body: [
      'Our website may use cookies and similar technologies to support site functionality, analytics, performance measurement, and advertising readiness.',
      'Placeholder integration points exist for GA4 and Meta Pixel. These tools may be activated later to track page views, property views, form submissions, WhatsApp clicks, and phone call clicks.',
    ],
  },
  {
    title: 'Site Visit Requests',
    body: [
      'When you request a site visit, we collect information such as your name, phone number, email address, preferred date, budget, location, property type, and message so our team can coordinate the visit.',
    ],
  },
  {
    title: 'Contact Form Data',
    body: [
      'Information submitted through contact forms is used only to respond to your inquiry, provide property consultation, and maintain communication records.',
    ],
  },
  {
    title: 'Lead Generation & Meta Ads',
    body: [
      'You may submit your information through Facebook or Instagram advertisements, including Meta Lead Forms. Information submitted through these ads may include your name, phone number, email address, location preference, property type, and budget.',
      'We use this information only for property consultation, site visit coordination, follow-up communication, and matching you with suitable property opportunities.',
      `${COMPANY_INFO.companyName} does not sell your personal information. You may request access, correction, or deletion of your data by contacting us at ${COMPANY_INFO.email}.`,
    ],
  },
  {
    title: 'Data Protection',
    body: [
      'We take reasonable measures to protect personal information against unauthorized access, misuse, alteration, or disclosure. Access to lead and inquiry information is limited to authorized team members involved in client service and sales follow-up.',
    ],
  },
  {
    title: 'Third Party Services',
    body: [
      'We may use third party services such as hosting providers, analytics platforms, advertising platforms, CRM tools, email services, WhatsApp services, and cloud storage providers. These services may process information according to their own policies and applicable laws.',
    ],
  },
  {
    title: 'Contact Information',
    body: [
      `For privacy questions, data requests, or deletion requests, contact ${COMPANY_INFO.companyName} at ${COMPANY_INFO.email}. We will make reasonable efforts to respond to legitimate requests in a timely manner.`,
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description={`Learn how ${COMPANY_INFO.companyName} collects, uses, protects, and manages lead, inquiry, site visit, analytics, and advertising data.`}
      canonical="/privacy-policy"
      sections={sections}
    />
  );
}
