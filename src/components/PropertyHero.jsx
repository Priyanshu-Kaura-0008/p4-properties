import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PropertyHero({
  title = 'Find Your Perfect Property',
  subtitle = 'Explore carefully selected residential and commercial opportunities across Tricity.',
}) {
  return (
    <section className="relative flex h-[45vh] min-h-[360px] items-center overflow-hidden bg-night pt-20">
      {/* Listings page hero */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
        alt="Luxury property exterior"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-night/62" />
      <div className="container-p4 relative z-10 text-white">
        <motion.nav
          className="mb-5 flex items-center gap-3 text-sm font-semibold text-white/72"
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Link to="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gold">Properties</span>
        </motion.nav>
        <motion.h1
          className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-7xl"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mt-5 max-w-2xl text-lg leading-8 text-white/78 md:text-xl"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
