import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { locationOptions } from '../data/siteData';

const selectBase =
  'h-12 w-full border border-ink/10 bg-white px-4 text-sm font-semibold text-ink outline-none transition focus:border-gold';

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

  const updateFilter = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section id="search" className="relative z-20 -mt-24 pb-16">
      <div className="container-p4">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-md bg-white p-5 shadow-premium md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_1fr_1fr_auto] lg:p-6"
        >
          <label className="sr-only" htmlFor="property-search-purpose">
            Buy or rent
          </label>
          <select
            id="property-search-purpose"
            className={selectBase}
            value={filters.purpose}
            onChange={(event) => updateFilter('purpose', event.target.value)}
          >
            <option>Buy</option>
            <option>Rent</option>
          </select>

          <label className="sr-only" htmlFor="property-search-category">
            Property category
          </label>
          <select
            id="property-search-category"
            className={selectBase}
            value={filters.category}
            onChange={(event) => updateFilter('category', event.target.value)}
          >
            <option>Residential</option>
            <option>Commercial</option>
          </select>

          <label className="sr-only" htmlFor="property-search-location">
            Location
          </label>
          <select
            id="property-search-location"
            className={selectBase}
            value={filters.location}
            onChange={(event) => updateFilter('location', event.target.value)}
          >
            <option value="">Location</option>
            {locationOptions.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>

          <label className="sr-only" htmlFor="property-search-budget">
            Budget
          </label>
          <select
            id="property-search-budget"
            className={selectBase}
            value={filters.budget}
            onChange={(event) => updateFilter('budget', event.target.value)}
          >
            <option value="">Budget</option>
            {budgetOptions.map((budget) => (
              <option key={budget.value} value={budget.value}>
                {budget.label}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="property-search-type">
            Property type
          </label>
          <select
            id="property-search-type"
            className={selectBase}
            value={filters.type}
            onChange={(event) => updateFilter('type', event.target.value)}
          >
            <option value="">Property Type</option>
            {propertyTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-3 bg-gold px-7 text-sm font-extrabold uppercase tracking-[0.14em] text-night transition-colors hover:bg-night hover:text-white"
          >
            <FaSearch aria-hidden="true" />
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
