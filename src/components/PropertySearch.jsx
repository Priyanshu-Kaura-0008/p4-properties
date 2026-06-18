import { useState } from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { locationOptions } from '../data/siteData';

const selectBase =
  'h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-gray-500 outline-none transition placeholder:text-neutral-500 focus:border-gold focus:ring-2 focus:ring-gold/15 md:h-12';

const budgetOptions = [
  { label: 'Under Rs. 50 Lakhs', value: 'Under Rs. 50 Lakhs' },
  { label: 'Rs. 50 Lakhs - Rs. 1 Crore', value: 'Rs. 50 Lakhs - Rs. 1 Crore' },
  { label: 'Rs. 1 Crore - Rs. 2 Crores', value: 'Rs. 1 Crore - Rs. 2 Crores' },
  { label: 'Rs. 2 Crores - Rs. 5 Crores', value: 'Rs. 2 Crores - Rs. 5 Crores' },
  { label: 'Above Rs. 5 Crores', value: 'Above Rs. 5 Crores' },
];

const propertyTypes = ['Apartment', 'Villa', 'Independent Floor', 'Plot', 'SCO', 'Office Space', 'Retail Shop'];

export default function PropertySearch() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    purpose: 'Buy',
    category: 'Residential',
    location: '',
    budget: '',
    type: '',
  });
  const [showMobileAdvanced, setShowMobileAdvanced] = useState(false);

  const updateFilter = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const selectClass = () => selectBase;

  const handleSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section id="search" className="relative z-20 -mt-12 pb-10 md:-mt-24 md:pb-16">
      <div className="container-p4">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-premium sm:p-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_1fr_1fr_auto] lg:items-end lg:p-6"
        >
          <div className={`${showMobileAdvanced ? 'grid' : 'hidden'} gap-4 md:grid md:contents`}>
          <Field label="Purpose" htmlFor="property-search-purpose">
            <select
              id="property-search-purpose"
              className={selectClass('purpose')}
              value={filters.purpose}
              onChange={(event) => updateFilter('purpose', event.target.value)}
            >
              <option>Buy</option>
              <option>Rent</option>
            </select>
          </Field>

          <Field label="Category" htmlFor="property-search-category">
            <select
              id="property-search-category"
              className={selectClass('category')}
              value={filters.category}
              onChange={(event) => updateFilter('category', event.target.value)}
            >
              <option>Residential</option>
              <option>Commercial</option>
            </select>
          </Field>
          </div>

          <Field label="Location" htmlFor="property-search-location">
            <select
              id="property-search-location"
              className={selectClass('location')}
              value={filters.location}
              onChange={(event) => updateFilter('location', event.target.value)}
            >
              <option value="">Select Location</option>
              {locationOptions.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
          </Field>

          <Field label="Budget" htmlFor="property-search-budget">
            <select
              id="property-search-budget"
              className={selectClass('budget')}
              value={filters.budget}
              onChange={(event) => updateFilter('budget', event.target.value)}
            >
              <option value="">Select Budget</option>
              {budgetOptions.map((budget) => (
                <option key={budget.value} value={budget.value}>
                  {budget.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Property Type" htmlFor="property-search-type">
            <select
              id="property-search-type"
              className={selectClass('type')}
              value={filters.type}
              onChange={(event) => updateFilter('type', event.target.value)}
            >
              <option value="">Select Type</option>
              {propertyTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </Field>

          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-gold px-7 text-sm font-extrabold uppercase tracking-[0.14em] text-night transition-colors hover:bg-night hover:text-white"
          >
            <FaSearch aria-hidden="true" />
            Search
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-ink/10 text-xs font-extrabold uppercase tracking-[0.12em] text-muted md:hidden"
            onClick={() => setShowMobileAdvanced((value) => !value)}
            aria-expanded={showMobileAdvanced}
          >
            More Options
            <FaChevronDown className={`transition-transform ${showMobileAdvanced ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="grid gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-muted sm:tracking-[0.16em]">
      {label}
      {children}
    </label>
  );
}
