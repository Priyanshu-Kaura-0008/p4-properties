import AboutUs from '../components/AboutUs';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import FoundersSection from '../components/FoundersSection';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../utils/seo';

export default function AboutPage() {
  return (
    <main className="bg-white text-ink">
      <SEO
        title="About P4 Properties | Property Consultant Chandigarh"
        description="Meet P4 Properties, a trusted property consultant in Chandigarh offering transparent real estate guidance across Chandigarh, Mohali, Panchkula, New Chandigarh, and nearby growth corridors."
        canonical="/about"
        structuredData={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About P4 Properties', path: '/about' }])]}
      />
      <Navbar />
      <section className="bg-night px-4 pb-16 pt-32 text-center text-white">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">About P4 Properties</p>
        <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-7xl">Trusted Real Estate Guidance</h1>
      </section>
      <AboutUs />
      <FoundersSection />
      <Footer />
      <FloatingActions />
    </main>
  );
}
