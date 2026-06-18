import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { locationOptions } from '../data/siteData';

const selectBase =
  'h-12 w-full rounded-xl border border-ink/10 bg-white px-4 text-sm font-semibold text-ink outline-none transition focus:border-gold';

export default function SearchBar() {
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    ['purpose', 'category', 'location', 'budget', 'type'].forEach((key) => {
      const value = formData.get(key);
      if (value) params.set(key, value);
    });
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section id="search" className="relative z-20 -mt-20 pb-12 md:-mt-24 md:pb-16">
      {/* Floating property search card */}
      <div className="container-p4">
        <form onSubmit={submit} className="grid gap-4 rounded-2xl bg-white p-4 shadow-premium sm:p-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_1fr_1fr_auto] lg:p-6">
          <label className="sr-only" htmlFor="intent">
            Transaction type
          </label>
          <select id="intent" name="purpose" className={selectBase} defaultValue="Buy">
            <option>Buy</option>
            <option>Sell</option>
          </select>

          <label className="sr-only" htmlFor="category">
            Property category
          </label>
          <select id="category" name="category" className={selectBase} defaultValue="Residential">
            <option>Residential</option>
            <option>Commercial</option>
          </select>

          <label className="sr-only" htmlFor="location">
            Location
          </label>
          <select id="location" name="location" className={selectBase} defaultValue="">
            <option value="" disabled>
              Location
            </option>
            {locationOptions.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>

          <label className="sr-only" htmlFor="budget">
            Budget
          </label>
          <select id="budget" name="budget" className={selectBase} defaultValue="">
            <option value="" disabled>
              Budget
            </option>
            <option>Under Rs. 1 Cr</option>
            <option>Rs. 1 Cr - 2 Cr</option>
            <option>Rs. 2 Cr - 5 Cr</option>
            <option>Above Rs. 5 Cr</option>
          </select>

          <label className="sr-only" htmlFor="type">
            Property type
          </label>
          <select id="type" name="type" className={selectBase} defaultValue="">
            <option value="" disabled>
              Property Type
            </option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Independent Floor</option>
            <option>Office Space</option>
            <option>Plot</option>
          </select>

          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-gold px-7 text-sm font-extrabold uppercase tracking-[0.14em] text-night transition-colors hover:bg-night hover:text-white"
          >
            <FaSearch aria-hidden="true" />
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
