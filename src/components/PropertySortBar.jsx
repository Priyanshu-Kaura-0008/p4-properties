import { FaFilter, FaList, FaThLarge } from 'react-icons/fa';

export default function PropertySortBar({ total, sort, onSortChange, view, onViewChange, onOpenFilters }) {
  return (
    <div className="mb-7 flex flex-col gap-4 rounded-md border border-ink/10 bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-2xl font-bold text-ink">Showing {total} Properties</p>
          <p className="mt-1 text-sm font-semibold text-muted">Curated opportunities across Tricity markets</p>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center bg-night text-white lg:hidden"
          onClick={onOpenFilters}
          aria-label="Open property filters"
        >
          <FaFilter aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="sort-properties">
          Sort properties
        </label>
        <select
          id="sort-properties"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-11 border border-ink/10 bg-white px-4 text-sm font-bold text-ink outline-none focus:border-gold"
        >
          <option>Latest</option>
          <option>Price Low to High</option>
          <option>Price High to Low</option>
          <option>Largest Area</option>
          <option>Featured First</option>
        </select>

        <div className="grid grid-cols-2 border border-ink/10" aria-label="Property view toggle">
          <button
            type="button"
            onClick={() => onViewChange('grid')}
            className={`flex h-11 items-center justify-center gap-2 px-4 text-sm font-bold ${
              view === 'grid' ? 'bg-night text-white' : 'bg-white text-muted hover:text-ink'
            }`}
            aria-pressed={view === 'grid'}
          >
            <FaThLarge aria-hidden="true" />
            Grid
          </button>
          <button
            type="button"
            onClick={() => onViewChange('list')}
            className={`flex h-11 items-center justify-center gap-2 px-4 text-sm font-bold ${
              view === 'list' ? 'bg-night text-white' : 'bg-white text-muted hover:text-ink'
            }`}
            aria-pressed={view === 'list'}
          >
            <FaList aria-hidden="true" />
            List
          </button>
        </div>
      </div>
    </div>
  );
}
