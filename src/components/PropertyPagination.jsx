export default function PropertyPagination({ currentPage, totalPages, start, end, total, onPageChange }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-ink/10 pt-8 md:flex-row">
      <p className="text-sm font-semibold text-muted">
        Displaying {total === 0 ? 0 : start}-{end} of {total} properties
      </p>
      <nav className="flex items-center gap-2" aria-label="Property pagination">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`h-10 w-10 text-sm font-bold ${
                currentPage === page ? 'bg-gold text-night' : 'border border-ink/10 text-ink hover:border-gold'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="border border-ink/10 px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
