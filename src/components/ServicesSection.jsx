import { motion } from 'framer-motion';
import { FaBuilding, FaChartLine, FaCheck, FaHome, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Residential Properties',
    description:
      'Explore premium residential opportunities across Chandigarh, Mohali, Panchkula, and surrounding markets.',
    items: ['Villas', 'Apartments', 'Floors', 'Plots'],
    icon: FaHome,
  },
  {
    title: 'Commercial Properties',
    description: 'Strategic commercial assets designed for business growth and long-term value creation.',
    items: ['SCOs', 'Shops', 'Offices', 'Commercial Land'],
    icon: FaBuilding,
  },
  {
    title: 'Investment Consultancy',
    description: 'Data-driven investment advisory focused on maximizing returns and minimizing risk.',
    items: ['ROI Analysis', 'Investment Planning', 'Market Insights'],
    icon: FaChartLine,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function ServicesSection() {
  return (
    <motion.section
      id="services"
      className="relative overflow-hidden bg-white py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.11),transparent_34%),radial-gradient(circle_at_88%_16%,rgba(17,17,17,0.07),transparent_30%)]" />
      <div className="container-p4 relative z-10">
        <motion.div variants={cardVariants} className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Client Solutions</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">Our Services</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted">
            Comprehensive real estate solutions tailored for homebuyers, investors, and businesses across the Tricity
            region.
          </p>
        </motion.div>

        <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" variants={sectionVariants}>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="mt-10 grid gap-5 rounded-2xl border border-ink/10 bg-ivory/85 p-6 shadow-soft backdrop-blur-xl md:grid-cols-[auto_1fr_auto] md:items-center md:p-8"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-night text-gold shadow-soft">
            <FaShieldAlt aria-hidden="true" />
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-ink">Trusted guidance. Verified opportunities.</p>
            <p className="mt-2 leading-7 text-muted">
              Every recommendation is shaped by local market knowledge, clear documentation, and client-first advisory.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex justify-center rounded-xl border border-ink/15 bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-ink transition-all hover:-translate-y-1 hover:border-gold hover:text-gold hover:shadow-soft"
          >
            Browse Properties
          </Link>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-ink/10 bg-night p-8 text-center text-white shadow-premium"
        >
          <p className="font-display text-3xl font-bold">Ready to find your next property investment?</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_0_42px_rgba(212,175,55,0.45)]"
          >
            Get Expert Advice
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white/85 p-7 shadow-soft backdrop-blur-xl transition-shadow hover:shadow-premium"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-night text-2xl text-gold shadow-soft transition-all group-hover:bg-gold group-hover:text-night">
        <Icon aria-hidden="true" />
      </div>
      <h3 className="font-display text-3xl font-bold leading-tight text-ink">{service.title}</h3>
      <p className="mt-4 min-h-[84px] leading-8 text-muted">{service.description}</p>

      <ul className="mt-6 grid gap-3" aria-label={`${service.title} services`}>
        {service.items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm font-bold text-ink">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-xs text-gold">
              <FaCheck aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        className="mt-auto inline-flex w-fit pt-8 text-sm font-extrabold uppercase tracking-[0.16em] text-gold transition-colors hover:text-ink"
      >
        Learn More
      </Link>
    </motion.article>
  );
}
