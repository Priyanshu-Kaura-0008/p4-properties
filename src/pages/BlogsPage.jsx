import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import ErrorState from '../components/common/ErrorState';
import Loading from '../components/common/Loading';
import { COMPANY_INFO } from '../constants/companyInfo';
import blogService from '../services/blogService';
import { breadcrumbSchema } from '../utils/seo';

const fallbackImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85';

export default function BlogsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const page = Math.max(Number(searchParams.get('page')) || 1, 1);

  const loadBlogs = () => {
    setLoading(true);
    setError('');
    blogService
      .getBlogs({ page, limit: 9 })
      .then((data) => {
        setBlogs(data.data || []);
        setMeta(data.meta || { total: 0, page, pages: 1 });
      })
      .catch((requestError) => {
        setError(requestError.response?.data?.message || 'Unable to load blogs right now.');
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBlogs();
  }, [page]);

  const setPage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  return (
    <main className="bg-ivory text-ink">
      <SEO
        title={`Real Estate Blogs | ${COMPANY_INFO.companyName}`}
        description={`Read ${COMPANY_INFO.companyName} market insights, property guides, and real estate updates for Chandigarh Tricity.`}
        canonical="/blogs"
        structuredData={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blogs', path: '/blogs' }])]}
      />
      <Navbar />
      <section className="relative overflow-hidden bg-night pb-16 pt-28 text-white md:pb-20 md:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,.18),transparent_38%)]" />
        <div className="container-p4 relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Market Insights</p>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl md:text-7xl">{COMPANY_INFO.companyName} Blog</h1>
        </div>
      </section>

      <section className="container-p4 py-12 md:py-16">
        {loading ? (
          <Loading label="Loading blogs..." />
        ) : error ? (
          <ErrorState title="Blogs could not load" message={error} onRetry={loadBlogs} />
        ) : blogs.length ? (
          <>
            <div className="-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:gap-7 md:overflow-visible md:px-0 md:pb-0 md:grid-cols-2 xl:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
            <div className="mt-10 flex justify-end gap-3">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-xl border border-ink/15 px-5 py-3 font-bold disabled:opacity-40">Previous</button>
              <span className="px-5 py-3 font-bold">Page {page} of {meta.pages || 1}</span>
              <button disabled={page >= (meta.pages || 1)} onClick={() => setPage(page + 1)} className="rounded-xl border border-ink/15 px-5 py-3 font-bold disabled:opacity-40">Next</button>
            </div>
          </>
        ) : (
          <div className="rounded-md bg-white p-10 text-center shadow-soft">
            <h2 className="font-display text-3xl font-bold">No blogs published yet</h2>
            <p className="mt-3 text-muted">Check back soon for market updates and property guides.</p>
          </div>
        )}
      </section>
      <Footer />
      <FloatingActions />
    </main>
  );
}

function BlogCard({ blog }) {
  return (
    <motion.article whileHover={{ y: -8 }} className="min-w-[86%] snap-start overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft sm:min-w-[62%] md:min-w-0">
      <img src={blog.coverImage?.url || fallbackImage} alt={blog.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
      <div className="p-5 sm:p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">{blog.category || 'Real Estate'}</p>
        <h2 className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl">{blog.title}</h2>
        <p className="mt-3 line-clamp-3 leading-7 text-muted">{blog.excerpt}</p>
        <Link to={`/blogs/${blog.slug}`} className="mt-6 inline-flex rounded-xl bg-night px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white hover:bg-gold hover:text-night">
          Read More
        </Link>
      </div>
    </motion.article>
  );
}
