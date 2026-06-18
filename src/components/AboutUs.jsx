import { motion } from 'framer-motion';
import { FaHandshake, FaRegCheckCircle, FaShieldAlt, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const locations = [
  'Chandigarh',
  'Mohali',
  'Panchkula',
  'Kharar',
  'Kurali',
  'New Chandigarh',
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold md:mb-4 md:tracking-[0.28em]">About P4 Properties</p>
          <h2 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-5xl">
            Building futures through trusted real estate guidance.
          </h2>
          <div className="mt-4 grid gap-3 text-base leading-7 text-muted md:mt-6 md:gap-5 md:text-lg md:leading-9">
            <p>At P4 Properties, we believe real estate is more than transactions-it&apos;s about building futures.</p>
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

        <motion.div variants={sectionVariants} className="w-full max-w-full overflow-hidden md:hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.1}
            spaceBetween={12}
            loop
            autoplay={{ delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false }}
          >
            {pillars.map((pillar) => (
              <SwiperSlide key={pillar.title} className="h-auto">
                <PillarCard pillar={pillar} compact />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div variants={sectionVariants} className="hidden gap-5 lg:grid lg:grid-cols-2">
          {pillars.map((pillar, index) => {
            return (
              <PillarCard key={pillar.title} pillar={pillar} className={index % 2 === 1 ? 'lg:translate-y-8' : ''} />
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

function PillarCard({ pillar, compact = false, className = '' }) {
  const Icon = pillar.icon;

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className={`group h-full rounded-2xl border border-white/70 bg-white/65 shadow-soft backdrop-blur-xl transition-shadow hover:shadow-premium ${
        compact ? 'min-h-[190px] w-full p-5' : 'p-7'
      } ${className}`}
    >
      <div className={`${compact ? 'mb-4 h-11 w-11 text-base' : 'mb-6 h-14 w-14 text-xl'} flex items-center justify-center rounded-xl bg-night text-gold shadow-soft transition-all group-hover:bg-gold group-hover:text-night`}>
        <Icon aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-bold text-ink md:text-2xl">{pillar.title}</h3>
      <p className={`${compact ? 'mt-2 text-sm leading-6' : 'mt-3 leading-7'} text-muted`}>{pillar.description}</p>
    </motion.article>
  );
}
