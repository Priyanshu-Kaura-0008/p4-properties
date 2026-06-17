import AboutUs from '../components/AboutUs';
import AnimatedCounter from '../components/AnimatedCounter';
import FeaturedProperties from '../components/FeaturedProperties';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import FoundersSection from '../components/FoundersSection';
import Hero from '../components/Hero';
import LeadGenerationSection from '../components/LeadGenerationSection';
import LocationsSection from '../components/LocationsSection';
import Navbar from '../components/Navbar';
import PropertySearch from '../components/PropertySearch';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import {
  stats,
} from '../data/siteData';

export default function HomePage() {
  return (
    <main className="bg-white text-ink">
      <SEO
        title="P4 Properties | Property Dealer Chandigarh & Luxury Real Estate Tricity"
        description="Find luxury homes in Panchkula, residential properties in Mohali, commercial properties in Chandigarh, and property investment opportunities in New Chandigarh with P4 Properties."
        canonical="/"
      />
      <Navbar />
      <Hero />
      <PropertySearch />
      <FeaturedProperties />
      <AboutUs />
      <FoundersSection />
      <ServicesSection />

      <LocationsSection />

      <LeadGenerationSection />

      {/* Company statistics section */}
      <section className="bg-white py-24">
        <div className="container-p4 grid gap-10 rounded-md bg-ivory px-6 py-16 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <AnimatedCounter key={item.label} {...item} />
          ))}
        </div>
      </section>

      <TestimonialsSection />

      {/* Call to action section */}
      <section id="contact-us" className="bg-night py-24">
        <div className="container-p4 text-center">
          <SectionHeading
            eyebrow="Private Consultation"
            title="Ready to Find Your Dream Property?"
            subtitle="Our experts are here to guide you through every step of your real estate journey."
            light
          />
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="tel:+918195002006"
              className="bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-white"
            >
              Schedule Site Visit
            </a>
            <a
              href="mailto:info@p4properties.com"
              className="border border-white/40 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition-colors hover:border-gold hover:text-gold"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <FloatingActions />
    </main>
  );
}
