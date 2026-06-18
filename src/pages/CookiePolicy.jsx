import LegalPageLayout from './LegalPageLayout';
import { COMPANY_INFO } from '../constants/companyInfo';

const sections = [
  {
    title: 'What Cookies Are',
    body: [
      'Cookies are small files stored on your device to help websites remember preferences, improve performance, and understand how visitors interact with pages.',
    ],
  },
  {
    title: 'Analytics Cookies',
    body: [
      'Analytics cookies may be used to understand website traffic, page views, property views, and visitor behavior. GA4 may be integrated later through the existing analytics integration point.',
    ],
  },
  {
    title: 'Functional Cookies',
    body: [
      'Functional cookies may support website features such as navigation, form behavior, saved preferences, security, and performance.',
    ],
  },
  {
    title: 'Advertising Cookies',
    body: [
      'Advertising cookies or pixels may be used in the future to measure campaign performance, optimize ads, and understand lead generation activity from platforms such as Meta and Google.',
    ],
  },
  {
    title: 'Managing Cookies',
    body: [
      'You can manage or disable cookies through your browser settings. Disabling cookies may affect website functionality, analytics accuracy, or advertising measurement.',
    ],
  },
];

export default function CookiePolicy() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description={`Understand how ${COMPANY_INFO.companyName} may use cookies for functionality, analytics, advertising measurement, and website performance.`}
      canonical="/cookie-policy"
      sections={sections}
    />
  );
}
