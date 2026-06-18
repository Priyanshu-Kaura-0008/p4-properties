import AboutUs from '../components/AboutUs';
import FeaturedProperties from '../components/FeaturedProperties';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import LeadGenerationSection from '../components/LeadGenerationSection';
import LocationsSection from '../components/LocationsSection';
import Navbar from '../components/Navbar';
import PropertySearch from '../components/PropertySearch';
import SEO from '../components/SEO';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { COMPANY_INFO } from '../constants/companyInfo';

export default function HomePage() {
  return (
    <main className="bg-white text-ink">
      <SEO
        title={`${COMPANY_INFO.companyName} | Property Dealer Chandigarh & Luxury Real Estate Tricity`}
        description={`Find luxury homes in Panchkula, residential properties in Mohali, commercial properties in Chandigarh, and property investment opportunities in New Chandigarh with ${COMPANY_INFO.companyName}.`}
        canonical="/"
      />
      <Navbar />
      <Hero />
      <PropertySearch />
      <FeaturedProperties />
      <AboutUs />
      <ServicesSection />

      <LocationsSection />

      <LeadGenerationSection />

      <TestimonialsSection />

      <Footer />

      <FloatingActions />
    </main>
  );
}
