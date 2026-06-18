import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import ErrorState from '../components/common/ErrorState';
import Loading from '../components/common/Loading';
import { COMPANY_INFO } from '../constants/companyInfo';
import blogService from '../services/blogService';
import { breadcrumbSchema } from '../utils/seo';

const fallbackImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85';

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    blogService
      .getBlog(slug)
      .then(setBlog)
      .catch((requestError) => {
        setError(requestError.response?.data?.message || 'Unable to load this blog.');
        setBlog(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading label="Loading blog..." />;

  if (error || !blog) {
    return (
      <main className="bg-white text-ink">
        <Navbar />
        <section className="container-p4 py-36">
          <ErrorState title="Blog not found" message={error} />
          <Link to="/blogs" className="mt-6 inline-flex rounded-xl bg-gold px-6 py-3 font-bold text-night">Back to Blogs</Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-white text-ink">
      <SEO
        title={`${blog.title} | ${COMPANY_INFO.companyName}`}
        description={blog.excerpt || blog.content?.slice(0, 155)}
        image={blog.coverImage?.url || fallbackImage}
        canonical={`/blogs/${blog.slug}`}
        type="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: '/blogs' },
            { name: blog.title, path: `/blogs/${blog.slug}` },
          ]),
        ]}
      />
      <Navbar />
      <article>
        <section className="relative min-h-[62vh] overflow-hidden bg-night pt-28 text-white">
          <img src={blog.coverImage?.url || fallbackImage} alt={blog.title} className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="container-p4 relative z-10 py-24">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{blog.category || 'Real Estate'}</p>
            <h1 className="mt-4 max-w-5xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">{blog.title}</h1>
            {blog.excerpt ? <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{blog.excerpt}</p> : null}
          </div>
        </section>
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-p4 max-w-4xl py-16">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-p:leading-8 prose-p:text-muted">
            {blog.content?.split('\n').filter(Boolean).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link to="/blogs" className="mt-10 inline-flex border border-ink px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-ink hover:border-gold hover:bg-gold">
            Back to Blogs
          </Link>
        </motion.section>
      </article>
      <Footer />
      <FloatingActions />
    </main>
  );
}
