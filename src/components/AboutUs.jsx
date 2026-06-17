import { motion } from 'framer-motion';
import { FaHandshake, FaRegCheckCircle, FaShieldAlt, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const locations = [
  'Chandigarh',
  'Mohali',
  'Panchkula',
  'Kharar',
  'Kurali',
  'Panchkula Extension',
  'New Chandigarh',
  'Rajpura',
];

const pillars = [
  {
    title: 'Trust',
    description: 'Building long-term relationships through honesty and reliability.',
    icon: FaShieldAlt,
  },
  {
    title: 'Transparency',
    description: 'Providing complete clarity at every stage of the property journey.',
    icon: FaRegCheckCircle,
  },
  {
    title: 'Professionalism',
    description: 'Delivering expert guidance backed by market knowledge and experience.',
    icon: FaUserTie,
  },
  {
    title: 'Partnership',
    description: 'Working alongside clients to achieve their investment goals.',
    icon: FaHandshake,
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

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function AboutUs() {
  return (
    <motion.section
      id="about-us"
      className="relative overflow-hidden bg-ivory py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(17,17,17,0.08),transparent_28%)]" />
      <div className="container-p4 relative z-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-white/70 bg-white/75 p-7 shadow-premium backdrop-blur-xl md:p-10"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">About P4 Properties</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
            Building futures through trusted real estate guidance.
          </h2>
          <div className="mt-6 grid gap-5 text-lg leading-9 text-muted">
            <p>At P4 Properties, we believe real estate is more than transactions-it&apos;s about building futures.</p>
            <p>
              Serving Chandigarh, Mohali, Panchkula, Kharar, Kurali, Panchkula Extension, New Chandigarh, and Rajpura,
              we provide expert guidance for residential and commercial property investments.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3" aria-label="Service locations">
            {locations.map((location) => (
              <span
                key={location}
                className="rounded-full border border-gold/30 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                {location}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/properties"
              className="inline-flex justify-center rounded-xl bg-night px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-soft transition-all hover:-translate-y-1 hover:bg-gold hover:text-night hover:shadow-premium"
            >
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="inline-flex justify-center rounded-xl border border-ink/15 bg-white/70 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-1 hover:border-gold hover:text-gold hover:shadow-soft"
            >
              Book a Consultation
            </Link>
          </div>
        </motion.div>

        <motion.div variants={sectionVariants} className="grid gap-5 sm:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`group rounded-2xl border border-white/70 bg-white/65 p-7 shadow-soft backdrop-blur-xl transition-shadow hover:shadow-premium ${
                  index % 2 === 1 ? 'lg:translate-y-8' : ''
                }`}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-night text-xl text-gold shadow-soft transition-all group-hover:bg-gold group-hover:text-night">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-bold text-ink">{pillar.title}</h3>
                <p className="mt-3 leading-7 text-muted">{pillar.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
