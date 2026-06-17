import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const filterGroups = {
  purpose: ['Buy', 'Rent'],
  category: ['Residential', 'Commercial'],
  residentialTypes: ['Apartment', 'Independent Floor', 'Villa', 'Plot'],
  commercialTypes: ['SCO', 'Office Space', 'Retail Shop', 'Commercial Plot'],
  locations: [
    'Chandigarh',
    'Mohali',
    'Panchkula',
    'Kharar',
    'Kurali',
    'Panchkula Extension',
    'New Chandigarh',
    'Rajpura',
  ],
  budgets: [
    'Under Rs. 50 Lakhs',
    'Rs. 50 Lakhs - Rs. 1 Crore',
    'Rs. 1 Crore - Rs. 2 Crores',
    'Rs. 2 Crores - Rs. 5 Crores',
    'Above Rs. 5 Crores',
  ],
  bedrooms: ['1+', '2+', '3+', '4+', '5+'],
  amenities: ['Parking', 'Power Backup', 'Lift', 'Security', 'Clubhouse', 'Swimming Pool', 'Park'],
};

function CheckOption({ label, name, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-muted transition-colors hover:text-ink">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-gold"
      />
      {label}
    </label>
  );
}

function FilterContent({ filters, onToggle, onAreaChange, onReset, onApply, onClose }) {
  const propertyTypes =
    filters.category.includes('Commercial') && !filters.category.includes('Residential')
      ? filterGroups.commercialTypes
      : filters.category.includes('Residential') && !filters.category.includes('Commercial')
        ? filterGroups.residentialTypes
        : [...filterGroups.residentialTypes, ...filterGroups.commercialTypes];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Refine Search</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink">Advanced Filters</h2>
        </div>
        {onClose && (
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-ink/10 text-ink"
            onClick={onClose}
            aria-label="Close property filters"
          >
            <FaTimes aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="grid gap-8">
        <FilterGroup title="Property Purpose">
          {filterGroups.purpose.map((item) => (
            <CheckOption
              key={item}
              label={item}
              name="purpose"
              checked={filters.purpose.includes(item)}
              onChange={() => onToggle('purpose', item)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Property Category">
          {filterGroups.category.map((item) => (
            <CheckOption
              key={item}
              label={item}
              name="category"
              checked={filters.category.includes(item)}
              onChange={() => onToggle('category', item)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Property Type">
          {propertyTypes.map((item) => (
            <CheckOption
              key={item}
              label={item}
              name="type"
              checked={filters.type.includes(item)}
              onChange={() => onToggle('type', item)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Locations">
          {filterGroups.locations.map((item) => (
            <CheckOption
              key={item}
              label={item}
              name="location"
              checked={filters.location.includes(item)}
              onChange={() => onToggle('location', item)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Budget">
          {filterGroups.budgets.map((item) => (
            <CheckOption
              key={item}
              label={item}
              name="budget"
              checked={filters.budget.includes(item)}
              onChange={() => onToggle('budget', item)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Bedrooms">
          {filterGroups.bedrooms.map((item) => (
            <CheckOption
              key={item}
              label={item}
              name="bedrooms"
              checked={filters.bedrooms.includes(item)}
              onChange={() => onToggle('bedrooms', item)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Amenities">
          {filterGroups.amenities.map((item) => (
            <CheckOption
              key={item}
              label={item}
              name="amenities"
              checked={filters.amenities.includes(item)}
              onChange={() => onToggle('amenities', item)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Area Range">
          <label className="block text-sm font-semibold text-muted" htmlFor="min-area">
            Minimum area: <span className="text-ink">{filters.minArea} Sq. Ft.</span>
          </label>
          <input
            id="min-area"
            type="range"
            min="500"
            max="12000"
            step="100"
            value={filters.minArea}
            onChange={(event) => onAreaChange('minArea', Number(event.target.value))}
            className="w-full accent-gold"
          />
          <label className="mt-3 block text-sm font-semibold text-muted" htmlFor="max-area">
            Maximum area: <span className="text-ink">{filters.maxArea} Sq. Ft.</span>
          </label>
          <input
            id="max-area"
            type="range"
            min="500"
            max="12000"
            step="100"
            value={filters.maxArea}
            onChange={(event) => onAreaChange('maxArea', Number(event.target.value))}
            className="w-full accent-gold"
          />
        </FilterGroup>
      </div>

      <div className="sticky bottom-0 mt-8 grid gap-3 bg-white pt-5">
        <button
          type="button"
          onClick={onApply}
          className="bg-gold px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-night transition-colors hover:bg-night hover:text-white"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={onReset}
          className="border border-ink/15 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:text-gold"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <fieldset className="border-b border-ink/10 pb-6">
      <legend className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-ink">{title}</legend>
      <div className="grid gap-3">{children}</div>
    </fieldset>
  );
}

export default function PropertyFilters({ filters, onToggle, onAreaChange, onReset, onApply, isOpen, onClose }) {
  return (
    <>
      <aside className="sticky top-24 hidden max-h-[calc(100vh-120px)] rounded-md border border-ink/10 bg-white shadow-soft lg:block">
        <FilterContent
          filters={filters}
          onToggle={onToggle}
          onAreaChange={onAreaChange}
          onReset={onReset}
          onApply={onApply}
        />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[70] bg-night/55 lg:hidden"
              aria-label="Close property filters"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="fixed left-0 top-0 z-[80] h-full w-[min(92vw,390px)] bg-white shadow-premium lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              aria-label="Mobile property filters"
            >
              <FilterContent
                filters={filters}
                onToggle={onToggle}
                onAreaChange={onAreaChange}
                onReset={onReset}
                onApply={onApply}
                onClose={onClose}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
