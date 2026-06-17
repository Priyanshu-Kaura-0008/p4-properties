import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import ServicesSection from '../components/ServicesSection';
import { breadcrumbSchema } from '../utils/seo';

export default function ServicesPage() {
  return (
    <main className="bg-white text-ink">
      <SEO
        title="Real Estate Services | Residential & Commercial Properties Chandigarh"
        description="Explore P4 Properties services for residential properties in Mohali, commercial properties in Chandigarh, luxury homes in Panchkula, and investment consultancy across Tricity."
        canonical="/services"
        structuredData={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])]}
      />
      <Navbar />
      <section className="bg-night px-4 pb-16 pt-32 text-center text-white">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Our Services</p>
        <h1 className="font-display text-5xl font-bold md:text-7xl">Premium Real Estate Solutions</h1>
      </section>
      <ServicesSection />
      <Footer />
      <FloatingActions />
    </main>
  );
}
