import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import adminApi from '../api/adminApi';
import FeaturedProjects from '../components/FeaturedProjects';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import PropertyHero from '../components/PropertyHero';
import PropertyListItem from '../components/PropertyListItem';
import PropertyPagination from '../components/PropertyPagination';
import PropertySortBar from '../components/PropertySortBar';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../utils/seo';

const initialFilters = {
  purpose: [],
  category: [],
  type: [],
  location: [],
  budget: [],
  bedrooms: [],
  amenities: [],
  minArea: 500,
  maxArea: 12000,
};

const budgetRanges = {
  'Under Rs. 50 Lakhs': [0, 5000000],
  'Rs. 50 Lakhs - Rs. 1 Crore': [5000000, 10000000],
  'Rs. 1 Crore - Rs. 2 Crores': [10000000, 20000000],
  'Rs. 2 Crores - Rs. 5 Crores': [20000000, 50000000],
  'Above Rs. 5 Crores': [50000000, undefined],
};

const sortMap = {
  Latest: 'latest',
  'Price Low to High': 'priceLow',
  'Price High to Low': 'priceHigh',
  'Largest Area': 'largestArea',
  'Featured First': 'featured',
};

const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

const formatPrice = (price) => {
  const value = Number(price);
  if (!Number.isFinite(value)) return 'Price on Request';
  return `Rs. ${value.toLocaleString('en-IN')}`;
};

const mapProperty = (property) => ({
  id: property.slug || property._id,
  title: property.title,
  price: formatPrice(property.price),
  location: [property.locality, property.city].filter(Boolean).join(', ') || property.address || property.city,
  city: property.city,
  purpose: property.purpose,
  category: property.category || 'Residential',
  type: property.propertyType,
  bedrooms: property.bedrooms,
  bathrooms: property.bathrooms,
  parking: property.parking,
  area: property.landArea,
  featured: property.featured,
  description: property.description,
  amenities: property.amenities || [],
  image: property.images?.[0]?.url || fallbackImage,
});

const getSingleParam = (searchParams, key) => searchParams.get(key) || '';

const filtersFromSearchParams = (searchParams) => ({
  ...initialFilters,
  purpose: getSingleParam(searchParams, 'purpose') ? [getSingleParam(searchParams, 'purpose')] : [],
  category: getSingleParam(searchParams, 'category') ? [getSingleParam(searchParams, 'category')] : [],
  type: getSingleParam(searchParams, 'type') ? [getSingleParam(searchParams, 'type')] : [],
  location: getSingleParam(searchParams, 'location') ? [getSingleParam(searchParams, 'location')] : [],
  budget: getSingleParam(searchParams, 'budget') ? [getSingleParam(searchParams, 'budget')] : [],
});

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('Latest');
  const [view, setView] = useState('grid');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filters = useMemo(() => filtersFromSearchParams(searchParams), [searchParams]);
  const currentPage = Math.max(Number(searchParams.get('page')) || 1, 1);

  useEffect(() => {
    const controller = new AbortController();
    const params = {
      page: currentPage,
      limit: 9,
      sort: sortMap[sort] || 'latest',
    };

    const purpose = searchParams.get('purpose');
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const propertyType = searchParams.get('type');
    const budget = searchParams.get('budget');

    if (purpose) params.purpose = purpose;
    if (category) params.category = category;
    if (location) params.city = location;
    if (propertyType) params.propertyType = propertyType;
    if (budgetRanges[budget]) {
      const [minPrice, maxPrice] = budgetRanges[budget];
      params.minPrice = minPrice;
      if (maxPrice !== undefined) params.maxPrice = maxPrice;
    }

    setLoading(true);
    setError('');

    adminApi
      .get('/properties', { params, signal: controller.signal })
      .then(({ data }) => {
        setProperties((data.data || []).map(mapProperty));
        setTotal(data.total || 0);
        setPages(data.pages || 1);
      })
      .catch((requestError) => {
        if (requestError.name === 'CanceledError') return;
        setError('Unable to load properties right now.');
        setProperties([]);
        setTotal(0);
        setPages(1);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [currentPage, searchParams, sort]);

  const updateParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('page');

    if (value) nextParams.set(key, value);
    else nextParams.delete(key);

    setSearchParams(nextParams);
  };

  const toggleFilter = (group, value) => {
    const current = filters[group]?.[0];
    updateParam(group, current === value ? '' : value);
  };

  const handleAreaChange = () => {};

  const resetFilters = () => {
    setSearchParams({});
    setSort('Latest');
  };

  const handlePageChange = (page) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(page));
    setSearchParams(nextParams);
  };

  const displayStart = total === 0 ? 0 : (currentPage - 1) * 9 + 1;
  const displayEnd = Math.min(currentPage * 9, total);

  return (
    <motion.main
      className="bg-white text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <SEO
        title="Properties for Sale & Rent | P4 Properties Chandigarh Tricity"
        description="Browse verified residential and commercial properties across Chandigarh, Mohali, Panchkula, New Chandigarh, Kharar, Kurali, and Rajpura with advanced filters and expert consultation."
        canonical="/properties"
        structuredData={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Properties', path: '/properties' }])]}
      />
      <Navbar />
      <PropertyHero />

      <section className="bg-ivory py-16">
        <div className="container-p4 grid gap-8 lg:grid-cols-[320px_1fr]">
          <PropertyFilters
            filters={filters}
            onToggle={toggleFilter}
            onAreaChange={handleAreaChange}
            onReset={resetFilters}
            onApply={() => setIsDrawerOpen(false)}
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />

          <div>
            <PropertySortBar
              total={total}
              sort={sort}
              onSortChange={(value) => {
                setSort(value);
                updateParam('page', '');
              }}
              view={view}
              onViewChange={setView}
              onOpenFilters={() => setIsDrawerOpen(true)}
            />

            {loading ? (
              <PropertyGridSkeleton view={view} />
            ) : error ? (
              <EmptyState title="Properties could not load" message={error} onReset={resetFilters} />
            ) : properties.length > 0 ? (
              view === 'grid' ? (
                <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-6">
                  {properties.map((property) => (
                    <PropertyListItem key={property.id} property={property} />
                  ))}
                </div>
              )
            ) : (
              <EmptyState
                title="No properties found"
                message="Adjust the filters to view more residential and commercial opportunities."
                onReset={resetFilters}
              />
            )}

            {!loading && !error && (
              <PropertyPagination
                currentPage={Math.min(currentPage, pages)}
                totalPages={pages}
                start={displayStart}
                end={displayEnd}
                total={total}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </section>

      <FeaturedProjects />

      <section className="bg-night py-24">
        <motion.div
          className="container-p4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <SectionHeading
            eyebrow="Advisor Support"
            title="Need Expert Guidance?"
            subtitle="Our property advisors are ready to help you make the right investment decision."
            light
          />
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@p4properties.com"
              className="bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-white"
            >
              Schedule Site Visit
            </a>
            <a
              href="tel:+918195002006"
              className="border border-white/40 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition-colors hover:border-gold hover:text-gold"
            >
              Call Us Today
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
      <FloatingActions />
    </motion.main>
  );
}

function PropertyGridSkeleton({ view }) {
  const items = Array.from({ length: 6 });

  if (view === 'list') {
    return (
      <div className="grid gap-6" aria-label="Loading properties">
        {items.slice(0, 3).map((_, index) => (
          <div key={index} className="grid animate-pulse overflow-hidden rounded-md border border-ink/10 bg-white lg:grid-cols-[330px_1fr]">
            <div className="h-72 bg-ink/10" />
            <div className="space-y-5 p-6">
              <div className="h-4 w-44 rounded bg-ink/10" />
              <div className="h-8 w-2/3 rounded bg-ink/10" />
              <div className="h-20 rounded bg-ink/10" />
              <div className="h-12 rounded bg-ink/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading properties">
      {items.map((_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-md border border-ink/10 bg-white shadow-soft">
          <div className="aspect-[4/3] bg-ink/10" />
          <div className="space-y-4 p-6">
            <div className="h-4 w-2/3 rounded bg-ink/10" />
            <div className="h-8 rounded bg-ink/10" />
            <div className="h-5 w-1/2 rounded bg-ink/10" />
            <div className="h-16 rounded bg-ink/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ title, message, onReset }) {
  return (
    <div className="rounded-md border border-ink/10 bg-white p-10 text-center shadow-soft">
      <h2 className="font-display text-3xl font-bold text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl leading-8 text-muted">{message}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 bg-gold px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-night"
      >
        Reset Filters
      </button>
    </div>
  );
}
