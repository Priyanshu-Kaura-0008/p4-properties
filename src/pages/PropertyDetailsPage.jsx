import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import adminApi from '../api/adminApi';
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
import { breadcrumbSchema, propertySchema } from '../utils/seo';

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

    adminApi
      .get(`/properties/${slug}`, { signal: controller.signal })
      .then(({ data }) => {
        const propertyData = data.data;
        setProperty(propertyData);

        return adminApi.get('/properties', {
          params: { city: propertyData.city, propertyType: propertyData.propertyType, limit: 6 },
          signal: controller.signal,
        });
      })
      .then(({ data }) => {
        setRelated((data.data || []).filter((item) => item.slug !== slug));
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
    `${property.title} in ${property.city} by P4 Properties. Explore price, amenities, location, images, and schedule a private site visit.`;
  const propertyImage = property.images?.[0]?.url;

  return (
    <motion.main
      className="bg-white text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <SEO
        title={`${property.title} in ${property.city} | P4 Properties`}
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

      <section className="bg-ivory py-16">
        <div className="container-p4 grid gap-8 xl:grid-cols-[1fr_360px]">
          <div className="grid gap-8">
            <PropertyOverview property={property} />
            <PropertyAmenities amenities={property.amenities} />
            <PropertyFloorPlans property={property} />
            <PropertyLocation property={property} />
            <div id="inquiry">
              <InquiryForm property={property} />
            </div>
            <ScheduleVisit property={property} />
          </div>
          <div className="hidden xl:block">
            <PropertySidebar property={property} />
          </div>
        </div>
      </section>

      <RelatedProperties properties={related} />

      <section className="bg-night py-24">
        <motion.div
          className="container-p4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Private Advisory</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            Ready to Make This Property Yours?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/72">
            Our experts are here to guide you through every step of the buying journey.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#site-visit"
              className="rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-white"
            >
              Schedule Site Visit
            </a>
            <a
              href="#inquiry"
              className="rounded-xl border border-white/40 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition-colors hover:border-gold hover:text-gold"
            >
              Send Inquiry
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
      <FloatingActions />
    </motion.main>
  );
}

function PropertyDetailsSkeleton() {
  return (
    <main className="bg-ivory text-ink">
      <Navbar />
      <section className="pt-20">
        <div className="h-[68vh] min-h-[430px] animate-pulse bg-ink/10" />
      </section>
      <section className="container-p4 grid gap-8 py-16 xl:grid-cols-[1fr_360px]" aria-label="Loading property details">
        <div className="grid gap-6">
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
    <main className="bg-white text-ink">
      <Navbar />
      <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-night pt-24 text-center">
        <img
          src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85"
          alt="Luxury property interior"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="container-p4 relative z-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Property Unavailable</p>
          <h1 className="font-display text-5xl font-bold text-white md:text-7xl">This Listing Could Not Be Found</h1>
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
