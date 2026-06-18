import { Link, useParams } from 'react-router-dom';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { COMPANY_INFO } from '../constants/companyInfo';
import { locationOptions } from '../data/siteData';
import { breadcrumbSchema, locationSlug } from '../utils/seo';

const descriptions = {
  Chandigarh: 'premium residential and commercial properties with trusted property dealer support',
  Mohali: 'fast-growing residential properties and real estate investment opportunities',
  Panchkula: 'luxury homes and upscale residential developments',
  Kharar: 'affordable homes and high-growth property investment options',
  Kurali: 'emerging plotted, residential, and investment opportunities',
  'Panchkula Extension': 'modern infrastructure and premium real estate projects',
  'New Chandigarh': 'planned luxury living and property investment opportunities',
  Rajpura: 'strategic residential, commercial, and industrial property investments',
};

const findLocation = (slug = '') => locationOptions.find((location) => locationSlug(location) === slug) || 'Chandigarh';

export default function LocationPage() {
  const { location } = useParams();
  const city = findLocation(location);
  const description = `Explore ${descriptions[city]} with ${COMPANY_INFO.companyName}. Get expert guidance for verified properties, site visits, and investment planning in ${city}.`;

  return (
    <main className="bg-white text-ink">
      <SEO
        title={`Properties in ${city} | ${COMPANY_INFO.companyName} Real Estate Consultant`}
        description={description}
        canonical={`/locations/${locationSlug(city)}`}
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Locations', path: '/#locations' },
            { name: city, path: `/locations/${locationSlug(city)}` },
          ]),
        ]}
      />
      <Navbar />
      <section className="relative flex min-h-[70vh] items-center bg-night px-4 pt-24 text-center text-white">
        <div className="container-p4">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Prime Location</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-7xl">Properties in {city}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/72">{description}</p>
          <Link
            to={`/properties?location=${encodeURIComponent(city)}`}
            className="mt-8 inline-flex rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-white"
          >
            Explore {city} Properties
          </Link>
        </div>
      </section>
      <Footer />
      <FloatingActions />
    </main>
  );
}
