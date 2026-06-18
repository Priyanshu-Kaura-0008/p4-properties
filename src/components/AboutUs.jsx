import { motion } from 'framer-motion';
import { FaBriefcase, FaEye, FaHandshake, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../constants/companyInfo';

const locations = COMPANY_INFO.serviceAreas.filter((location) => location !== 'Rajpura');

const pillars = [
  {
    title: 'Trust',
    description: 'Building long-term relationships through honesty and reliability.',
    icon: FaShieldAlt,
  },
  {
    title: 'Transparency',
    description: 'Providing complete clarity at every stage of the property journey.',
    icon: FaEye,
  },
  {
    title: 'Professionalism',
    description: 'Delivering expert guidance backed by market knowledge and experience.',
    icon: FaBriefcase,
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
      className="relative overflow-hidden bg-ivory py-10 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(17,17,17,0.08),transparent_28%)]" />
      <div className="container-p4 relative z-10 grid w-full max-w-full gap-6 overflow-hidden lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
        <motion.div
          variants={itemVariants}
          className="w-full max-w-full rounded-2xl border border-white/70 bg-white/75 p-4 shadow-premium backdrop-blur-xl sm:p-5 md:p-10"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold md:mb-4 md:tracking-[0.28em]">About {COMPANY_INFO.companyName}</p>
          <h2 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-5xl">
            Building futures through trusted real estate guidance.
          </h2>
          <div className="mt-4 grid gap-3 text-base leading-7 text-muted md:mt-6 md:gap-5 md:text-lg md:leading-9">
            <p>At {COMPANY_INFO.companyName}, we believe real estate is more than transactions-it&apos;s about building futures.</p>
            <p className="hidden sm:block">
              Serving Chandigarh, Mohali, Panchkula, Kharar, Kurali, Panchkula Extension, New Chandigarh, and Rajpura,
              we provide expert guidance for residential and commercial property investments.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2 md:mt-8 md:justify-start md:gap-3" aria-label="Service locations">
            {locations.map((location) => (
              <span
                key={location}
                className="rounded-full border border-gold/30 bg-white/80 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold sm:px-4 sm:text-xs sm:tracking-[0.12em]"
              >
                {location}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-9 md:gap-4">
            <Link
              to="/properties"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-night px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-soft transition-all hover:-translate-y-1 hover:bg-gold hover:text-night hover:shadow-premium sm:w-auto"
            >
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-ink/15 bg-white/70 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-1 hover:border-gold hover:text-gold hover:shadow-soft sm:w-auto"
            >
              Book a Consultation
            </Link>
          </div>
        </motion.div>

        <motion.div variants={sectionVariants} className="grid w-full max-w-full grid-cols-2 items-stretch gap-3 md:gap-4 lg:gap-5">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.title} pillar={pillar} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function PillarCard({ pillar, className = '' }) {
  const Icon = pillar.icon;

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className={`group relative flex h-full min-h-[160px] max-h-[190px] w-full flex-col overflow-hidden rounded-[20px] border border-black/10 bg-white p-4 shadow-soft transition-shadow hover:shadow-premium md:p-5 lg:min-h-[260px] lg:max-h-none lg:border-white/70 lg:bg-white/65 lg:p-7 ${className}`}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/12 text-lg text-gold shadow-soft transition-all md:h-11 md:w-11 lg:mb-6 lg:h-16 lg:w-16 lg:bg-night lg:text-2xl">
        <Icon aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-bold leading-tight text-ink md:text-xl lg:text-2xl">{pillar.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 md:text-[15px] lg:mt-4 lg:min-h-[84px] lg:leading-8 lg:text-muted">{pillar.description}</p>
    </motion.article>
  );
}
