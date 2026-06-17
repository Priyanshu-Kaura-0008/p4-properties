import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import LeadGenerationSection from '../components/LeadGenerationSection';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../utils/seo';

export default function ContactPage() {
  return (
    <main className="bg-white text-ink">
      <SEO
        title="Contact P4 Properties | Property Dealer Chandigarh"
        description="Contact P4 Properties for property consultation, site visits, residential properties in Mohali, commercial properties in Chandigarh, and luxury homes in Panchkula."
        canonical="/contact"
        structuredData={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]}
      />
      <Navbar />
      <section className="bg-night px-4 pb-16 pt-32 text-center text-white">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Contact P4 Properties</p>
        <h1 className="font-display text-5xl font-bold md:text-7xl">Book a Private Consultation</h1>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
          Call +91 81950 02006 or share your requirements to schedule a verified site visit.
        </p>
      </section>
      <LeadGenerationSection />
      <Footer />
      <FloatingActions />
    </main>
  );
}
