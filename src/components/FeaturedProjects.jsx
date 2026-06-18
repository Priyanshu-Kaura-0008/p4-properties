import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import propertyService from '../services/propertyService';
import SectionHeading from './SectionHeading';

const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80';

const formatPrice = (price) => {
  const value = Number(price);
  if (!Number.isFinite(value)) return 'Price on Request';
  return `Rs. ${value.toLocaleString('en-IN')}`;
};

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    propertyService
      .getFeaturedProperties({ limit: 3 })
      .then((data) => setProjects(data.data || []))
      .catch(() => setProjects([]));
  }, []);

  if (!projects.length) return null;

  return (
    <section className="bg-ivory py-12 md:py-24">
      <div className="container-p4">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Exclusive Investment Opportunities"
          subtitle="Premium developments selected for location quality, product depth, and long-term value."
        />
        <div className="-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:gap-7 lg:overflow-visible lg:px-0 lg:pb-0 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.article
              key={project._id}
              className="group min-w-[86%] snap-start overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft transition-all hover:-translate-y-2 hover:border-gold/60 hover:shadow-premium sm:min-w-[62%] lg:min-w-0"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.mainImage?.url || project.images?.[0]?.url || fallbackImage}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5 sm:p-7">
                <p className="flex items-center gap-2 text-sm font-semibold text-muted">
                  <FaMapMarkerAlt className="text-gold" aria-hidden="true" />
                  {[project.location || project.locality, project.city].filter(Boolean).join(', ')}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">{project.title}</h3>
                <p className="mt-2 text-lg font-extrabold text-gold">{formatPrice(project.price)}</p>
                <ul className="mt-5 grid gap-2 text-sm font-semibold text-muted">
                  {(project.amenities || []).slice(0, 4).map((highlight) => (
                    <li key={highlight} className="border-l-2 border-gold pl-3">
                      {highlight}
                    </li>
                  ))}
                </ul>
                <a href={`/properties/${project.slug}`} className="mt-7 block min-h-12 w-full rounded-xl border border-ink px-5 py-3 text-center text-sm font-extrabold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:bg-gold">
                  Explore Project
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
