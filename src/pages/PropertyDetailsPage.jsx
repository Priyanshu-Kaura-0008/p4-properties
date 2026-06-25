import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCalendarCheck, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import InquiryForm from '../components/InquiryForm';
import Navbar from '../components/Navbar';
import PropertyAmenities from '../components/PropertyAmenities';
import PropertyFloorPlans from '../components/PropertyFloorPlans';
import PropertyGallery from '../components/PropertyGallery';
import PropertyLocation from '../components/PropertyLocation';
import PropertyOverview from '../components/PropertyOverview';
import PropertySidebar from '../components/PropertySidebar';
import RelatedProperties from '../components/RelatedProperties';
import ScheduleVisit from '../components/ScheduleVisit';
import SEO from '../components/SEO';
import { COMPANY_INFO, CONTACT_LINKS } from '../constants/companyInfo';
import propertyService from '../services/propertyService';
import { breadcrumbSchema, propertySchema } from '../utils/seo';
import { trackPropertyView } from '../utils/tracking';

export default function PropertyDetailsPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError('');

    propertyService
      .getProperty(slug, { signal: controller.signal })
      .then((propertyData) => {
        setProperty(propertyData);
        trackPropertyView(propertyData);

        return propertyService.getProperties(
          { city: propertyData.city, propertyType: propertyData.propertyType, limit: 5 },
          { signal: controller.signal },
        );
      })
      .then((data) => {
        setRelated((data.data || []).filter((item) => item.slug !== slug).slice(0, 4));
      })
      .catch((requestError) => {
        if (requestError.name === 'CanceledError') return;
        setError('Unable to load this property right now.');
        setProperty(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [slug]);

  if (loading) return <PropertyDetailsSkeleton />;
  if (error || !property) return <PropertyNotFound message={error} />;

  const propertyDescription =
    property.description?.slice(0, 155) ||
    `${property.title} in ${property.city} by ${COMPANY_INFO.companyName}. Explore price, amenities, location, images, and schedule a private site visit.`;
  const propertyImage = property.mainImage?.url || property.images?.[0]?.url;

  return (
    <motion.main
      className="w-full max-w-full overflow-x-hidden bg-white pb-24 text-ink xl:pb-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <SEO
        title={`${property.title} in ${property.city} | ${COMPANY_INFO.companyName}`}
        description={propertyDescription}
        image={propertyImage}
        canonical={`/properties/${property.slug}`}
        type="article"
        structuredData={[
          propertySchema(property),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Properties', path: '/properties' },
            { name: property.title, path: `/properties/${property.slug}` },
          ]),
        ]}
      />
      <Navbar />
      <PropertyGallery property={property} />

      <section className="bg-ivory py-10 md:py-14 xl:py-16">
        <div className="property-detail-container grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-9 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid min-w-0 gap-6 md:gap-8">
            <PropertyOverview property={property} />
            <PropertyAmenities amenities={property.amenities} />
            <PropertyFloorPlans property={property} />
            <PropertyLocation property={property} />
            <div id="inquiry">
              <InquiryForm property={property} />
            </div>
            <ScheduleVisit property={property} />
          </div>
          <div className="hidden min-w-0 xl:block">
            <PropertySidebar property={property} />
          </div>
        </div>
      </section>

      <RelatedProperties properties={related} />

      <section className="bg-night py-14 md:py-20">
        <motion.div
          className="property-detail-container text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Private Advisory</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-6xl">
            Ready to Make This Property Yours?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
            Our experts are here to guide you through every step of the buying journey.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="/site-visit"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gold px-6 py-4 text-center text-xs font-extrabold uppercase tracking-[0.1em] text-night transition-colors hover:bg-white sm:px-7 sm:text-sm sm:tracking-[0.14em]"
            >
              Schedule Site Visit
            </a>
            <a
              href="#inquiry"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-6 py-4 text-center text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:border-gold hover:text-gold sm:px-7 sm:text-sm sm:tracking-[0.14em]"
            >
              Send Inquiry
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
      <MobilePropertyCta property={property} />
      <div className="hidden xl:block">
        <FloatingActions />
      </div>
    </motion.main>
  );
}

function MobilePropertyCta({ property }) {
  const message = encodeURIComponent(`I am interested in ${property.title}. Please share details.`);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[95] border-t border-ink/10 bg-white/95 px-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_45px_rgba(17,17,17,0.16)] backdrop-blur-xl xl:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1.5">
        <a
          href="#inquiry"
          className="inline-flex min-h-12 min-w-0 flex-col items-center justify-center rounded-lg bg-gold px-1.5 py-2 text-center text-[10px] font-extrabold uppercase leading-tight tracking-[0.04em] text-night"
        >
          Inquiry
        </a>
        <a
          href="#site-visit"
          className="inline-flex min-h-12 min-w-0 flex-col items-center justify-center rounded-lg border border-ink/15 bg-white px-1.5 py-2 text-center text-[10px] font-extrabold uppercase leading-tight tracking-[0.04em] text-ink"
        >
          <FaCalendarCheck className="mb-1 text-gold" aria-hidden="true" />
          Visit
        </a>
        <a
          href={CONTACT_LINKS.phone}
          className="inline-flex min-h-12 min-w-0 flex-col items-center justify-center rounded-lg bg-night px-1.5 py-2 text-center text-[10px] font-extrabold uppercase leading-tight tracking-[0.04em] text-white"
        >
          <FaPhoneAlt className="mb-1" aria-hidden="true" />
          Call
        </a>
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 min-w-0 flex-col items-center justify-center rounded-lg border border-ink/15 bg-white px-1.5 py-2 text-center text-[10px] font-extrabold uppercase leading-tight tracking-[0.04em] text-ink"
        >
          <FaWhatsapp className="mb-1 text-gold" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

function PropertyDetailsSkeleton() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-ivory text-ink">
      <Navbar />
      <section className="pt-20">
        <div className="h-[68vh] min-h-[430px] animate-pulse bg-ink/10" />
      </section>
      <section className="property-detail-container grid min-w-0 gap-8 py-16 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]" aria-label="Loading property details">
        <div className="grid min-w-0 gap-6">
          <div className="h-44 animate-pulse rounded-2xl bg-white" />
          <div className="h-28 animate-pulse rounded-2xl bg-white" />
          <div className="h-72 animate-pulse rounded-2xl bg-white" />
          <div className="h-96 animate-pulse rounded-2xl bg-white" />
        </div>
        <div className="hidden h-96 animate-pulse rounded-2xl bg-white xl:block" />
      </section>
    </main>
  );
}

function PropertyNotFound({ message }) {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white text-ink">
      <Navbar />
      <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-night pt-24 text-center">
        <img
          src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85"
          alt="Luxury property interior"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="property-detail-container relative z-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Property Unavailable</p>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl md:text-7xl">This Listing Could Not Be Found</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/72">
            {message || 'The property may have been reserved, updated, or removed from the public portfolio.'}
          </p>
          <Link
            to="/properties"
            className="mt-8 inline-flex rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-white"
          >
            Browse Properties
          </Link>
        </div>
      </section>
      <Footer />
      <FloatingActions />
    </main>
  );
}
