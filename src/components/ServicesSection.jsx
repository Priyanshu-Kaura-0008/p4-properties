import { motion } from 'framer-motion';
import { FaBuilding, FaChartLine, FaCheck, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
      className="relative overflow-hidden bg-white py-10 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.11),transparent_34%),radial-gradient(circle_at_88%_16%,rgba(17,17,17,0.07),transparent_30%)]" />
      <div className="container-p4 relative z-10">
        <motion.div variants={cardVariants} className="mx-auto mb-8 max-w-4xl text-center md:mb-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Client Solutions</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">Our Services</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted md:text-lg">
            Comprehensive real estate solutions tailored for homebuyers, investors, and businesses across the Tricity
            region.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants} className="w-full max-w-full overflow-hidden lg:hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.1}
            spaceBetween={16}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {services.map((service) => (
              <SwiperSlide key={service.title} className="h-auto">
                <ServiceCard service={service} compact />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div className="hidden gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-3" variants={sectionVariants}>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function ServiceCard({ service, compact = false }) {
  const Icon = service.icon;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className={`group flex h-full flex-col rounded-2xl border border-ink/10 bg-white/85 shadow-soft backdrop-blur-xl transition-shadow hover:shadow-premium ${
        compact ? 'min-h-[285px] w-full p-5' : 'p-7'
      }`}
    >
      <div className={`${compact ? 'mb-4 h-12 w-12 text-lg' : 'mb-6 h-16 w-16 text-2xl'} flex items-center justify-center rounded-2xl bg-night text-gold shadow-soft transition-all group-hover:bg-gold group-hover:text-night`}>
        <Icon aria-hidden="true" />
      </div>
      <h3 className="font-display text-2xl font-bold leading-tight text-ink md:text-3xl">{service.title}</h3>
      <p className={`${compact ? 'mt-3 text-sm leading-6' : 'mt-4 leading-8 md:min-h-[84px]'} text-muted`}>{service.description}</p>

      <ul className={`${compact ? 'mt-4 gap-2' : 'mt-6 gap-3'} grid`} aria-label={`${service.title} services`}>
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
        className={`${compact ? 'pt-5' : 'pt-8'} mt-auto inline-flex w-fit text-sm font-extrabold uppercase tracking-[0.16em] text-gold transition-colors hover:text-ink`}
      >
        Learn More
      </Link>
    </motion.article>
  );
}
