import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { featuredProjects } from '../data/properties';
import SectionHeading from './SectionHeading';

export default function FeaturedProjects() {
  return (
    <section className="bg-ivory py-24">
      <div className="container-p4">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Exclusive Investment Opportunities"
          subtitle="Premium developments selected for location quality, product depth, and long-term value."
        />
        <div className="grid gap-7 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <motion.article
              key={project.name}
              className="group overflow-hidden rounded-md border border-ink/10 bg-white shadow-soft transition-all hover:-translate-y-2 hover:border-gold/60 hover:shadow-premium"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-7">
                <p className="flex items-center gap-2 text-sm font-semibold text-muted">
                  <FaMapMarkerAlt className="text-gold" aria-hidden="true" />
                  {project.location}
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold text-ink">{project.name}</h3>
                <p className="mt-2 text-lg font-extrabold text-gold">{project.price}</p>
                <ul className="mt-5 grid gap-2 text-sm font-semibold text-muted">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="border-l-2 border-gold pl-3">
                      {highlight}
                    </li>
                  ))}
                </ul>
                <button className="mt-7 w-full border border-ink px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:bg-gold">
                  Explore Project
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
