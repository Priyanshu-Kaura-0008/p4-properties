import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
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
import { COMPANY_INFO, CONTACT_LINKS } from '../constants/companyInfo';
import propertyService from '../services/propertyService';
import { breadcrumbSchema } from '../utils/seo';

const initialFilters = {
  purpose: [],
  category: [],
  type: [],
  location: [],
  budget: [],
  status: [],
  search: '',
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

const cityPages = {
  '/properties/chandigarh': {
    city: 'Chandigarh',
    title: `Property Dealer Chandigarh | ${COMPANY_INFO.companyName}`,
    description:
      `Explore verified residential and commercial properties in Chandigarh with ${COMPANY_INFO.companyName}, a trusted property dealer for premium homes, SCOs, offices, and investment opportunities.`,
    h1: 'Property Dealer Chandigarh',
  },
  '/properties/mohali': {
    city: 'Mohali',
    title: `Real Estate Mohali | ${COMPANY_INFO.companyName}`,
    description:
      `Browse live real estate listings in Mohali including luxury villas, apartments, plots, shops, offices, and commercial investments with ${COMPANY_INFO.companyName}.`,
    h1: 'Real Estate Mohali',
  },
  '/properties/panchkula': {
    city: 'Panchkula',
    title: `Luxury Homes Panchkula | ${COMPANY_INFO.companyName}`,
    description:
      `Find luxury homes in Panchkula with verified villas, independent floors, premium apartments, and residential investment options curated by ${COMPANY_INFO.companyName}.`,
    h1: 'Luxury Homes Panchkula',
  },
  '/properties/new-chandigarh': {
    city: 'New Chandigarh',
    title: `Property Investment New Chandigarh | ${COMPANY_INFO.companyName}`,
    description:
      `Discover property investment opportunities in New Chandigarh including plots, villas, apartments, and growth corridor real estate options with ${COMPANY_INFO.companyName}.`,
    h1: 'Property Investment New Chandigarh',
  },
};

const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

const formatPrice = (price) => {
  const value = Number(price);
  if (!Number.isFinite(value)) return 'Price on Request';
  return `Rs. ${value.toLocaleString('en-IN')}`;
};

const mapProperty = (property) => ({
  id: property.slug || property._id,
  slug: property.slug,
  _id: property._id,
  title: property.title,
  price: formatPrice(property.price),
  location: [property.location || property.locality, property.city].filter(Boolean).join(', ') || property.address || property.city,
  city: property.city,
  purpose: property.purpose,
  category: property.category || 'Residential',
  type: property.propertyType,
  bedrooms: property.bedrooms,
  bathrooms: property.bathrooms,
  parking: property.parking,
  area: property.area || property.landArea,
  featured: property.featured,
  description: property.description,
  amenities: property.amenities || [],
  image: property.mainImage?.url || property.images?.[0]?.url || fallbackImage,
});

const getSingleParam = (searchParams, key) => searchParams.get(key) || '';

const filtersFromSearchParams = (searchParams) => ({
  ...initialFilters,
  purpose: getSingleParam(searchParams, 'purpose') ? [getSingleParam(searchParams, 'purpose')] : [],
  category: getSingleParam(searchParams, 'category') ? [getSingleParam(searchParams, 'category')] : [],
  type: getSingleParam(searchParams, 'type') ? [getSingleParam(searchParams, 'type')] : [],
  location: getSingleParam(searchParams, 'location') ? [getSingleParam(searchParams, 'location')] : [],
  status: getSingleParam(searchParams, 'status') ? [getSingleParam(searchParams, 'status')] : [],
  budget: getSingleParam(searchParams, 'budget') ? [getSingleParam(searchParams, 'budget')] : [],
  search: getSingleParam(searchParams, 'search'),
  minArea: Number(searchParams.get('minArea')) || initialFilters.minArea,
  maxArea: Number(searchParams.get('maxArea')) || initialFilters.maxArea,
});

export default function PropertiesPage() {
  const location = useLocation();
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
  const cityPage = cityPages[location.pathname];
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
    const city = cityPage?.city || searchParams.get('city');
    const propertyType = searchParams.get('type');
    const budget = searchParams.get('budget');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minArea = searchParams.get('minArea');
    const maxArea = searchParams.get('maxArea');

    if (purpose) params.purpose = purpose;
    if (category) params.category = category;
    if (city) params.city = city;
    if (location) params.location = location;
    if (propertyType) params.propertyType = propertyType;
    if (status) params.status = status;
    if (search) params.search = search;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (minArea) params.minArea = minArea;
    if (maxArea) params.maxArea = maxArea;
    if (budgetRanges[budget]) {
      const [minPrice, maxPrice] = budgetRanges[budget];
      params.minPrice = minPrice;
      if (maxPrice !== undefined) params.maxPrice = maxPrice;
    }

    const hasSearchFilters = [
      'purpose',
      'category',
      'location',
      'city',
      'type',
      'budget',
      'status',
      'search',
      'minPrice',
      'maxPrice',
      'minArea',
      'maxArea',
    ].some((key) => searchParams.get(key)) || Boolean(cityPage);

    setLoading(true);
    setError('');

    const request = hasSearchFilters ? propertyService.searchProperties : propertyService.getProperties;

    request(params, { signal: controller.signal })
      .then((data) => {
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
  }, [cityPage, currentPage, searchParams, sort]);

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

  const handleAreaChange = (key, value) => {
    updateParam(key, value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('page');
    ['search', 'minPrice', 'maxPrice'].forEach((key) => {
      const value = formData.get(key)?.toString().trim();
      if (value) nextParams.set(key, value);
      else nextParams.delete(key);
    });
    setSearchParams(nextParams);
  };

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
      className="w-full max-w-full overflow-x-hidden bg-white text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <SEO
        title={cityPage?.title || (searchParams.get('location') ? `${searchParams.get('location')} Properties | ${COMPANY_INFO.companyName}` : `Properties for Sale & Rent | ${COMPANY_INFO.companyName} Chandigarh Tricity`)}
        description={cityPage?.description || 'Browse verified residential and commercial properties across Chandigarh, Mohali, Panchkula, New Chandigarh, Kharar, Kurali, and Rajpura with advanced filters and expert consultation.'}
        canonical={cityPage ? location.pathname : '/properties'}
        structuredData={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Properties', path: '/properties' }])]}
      />
      <Navbar />
      <PropertyHero title={cityPage?.h1} subtitle={cityPage?.description} />

      <section className="bg-ivory py-12 md:py-16">
        <div className="container-p4 grid min-w-0 gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <PropertyFilters
            filters={filters}
            onToggle={toggleFilter}
            onAreaChange={handleAreaChange}
            onReset={resetFilters}
            onApply={() => setIsDrawerOpen(false)}
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />

          <div className="min-w-0">
            <form onSubmit={handleSearchSubmit} className="mb-5 grid min-w-0 gap-3 rounded-xl border border-ink/10 bg-white p-4 shadow-soft sm:grid-cols-[minmax(0,1fr)_auto]">
              <div className="grid min-w-0 gap-3 md:grid-cols-3">
                <input
                  name="search"
                  defaultValue={filters.search}
                  className="min-h-12 rounded-xl border border-ink/10 px-4 py-3 font-semibold outline-none focus:border-gold"
                  placeholder="Search by title, city, or description"
                />
                <input
                  name="minPrice"
                  defaultValue={searchParams.get('minPrice') || ''}
                  className="min-h-12 rounded-xl border border-ink/10 px-4 py-3 font-semibold outline-none focus:border-gold"
                  placeholder="Min price"
                  inputMode="numeric"
                />
                <input
                  name="maxPrice"
                  defaultValue={searchParams.get('maxPrice') || ''}
                  className="min-h-12 rounded-xl border border-ink/10 px-4 py-3 font-semibold outline-none focus:border-gold"
                  placeholder="Max price"
                  inputMode="numeric"
                />
              </div>
              <button className="min-h-12 rounded-xl bg-gold px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-night" type="submit">
                Search
              </button>
            </form>
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

      <section className="bg-night py-16 md:py-24">
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
              href="/site-visit"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-white"
            >
              Schedule Site Visit
            </a>
            <a
              href={CONTACT_LINKS.phone}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition-colors hover:border-gold hover:text-gold"
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
        className="mt-6 rounded-xl bg-gold px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-night"
      >
        Reset Filters
      </button>
    </div>
  );
}
