import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { COMPANY_INFO } from '../constants/companyInfo';
import testimonialService from '../services/testimonialService';
import 'swiper/css';

const stats = [
  { value: 500, suffix: '+', label: 'Properties Sold' },
  { value: 300, suffix: '+', label: 'Happy Clients' },
  { value: 100, prefix: 'Rs. ', suffix: '+ Cr', label: 'Transactions' },
  { value: 100, suffix: '%', label: 'Transparency' },
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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    testimonialService
      .getTestimonials({ featured: true, limit: 8 })
      .then((data) => {
        setTestimonials(data.data || []);
        setError('');
      })
      .catch((requestError) => {
        setTestimonials([]);
        setError(requestError.response?.data?.message || 'Unable to load testimonials right now.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.section
      id="testimonials"
      className="relative overflow-hidden bg-ivory py-12 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.12),transparent_36%),radial-gradient(circle_at_80%_18%,rgba(17,17,17,0.08),transparent_30%)]" />
      <div className="container-p4 relative z-10">
        <motion.div variants={itemVariants} className="mx-auto mb-8 max-w-4xl text-center md:mb-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Client Stories</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted md:text-lg">
            Trusted by homebuyers, investors, and businesses across Chandigarh Tricity.
          </p>
        </motion.div>

        {loading ? (
          <TestimonialSkeleton />
        ) : error ? (
          <TestimonialState title="Testimonials could not load" message={error} />
        ) : testimonials.length ? (
          <motion.div variants={itemVariants}>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1180: { slidesPerView: 3 },
              }}
              aria-label="Client testimonials slider"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id} className="h-auto">
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          <TestimonialState title="No testimonials yet" message="Client stories will appear here once approved in the admin panel." />
        )}

        <motion.div
          variants={sectionVariants}
          className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/70 bg-white/75 p-4 shadow-soft backdrop-blur-xl sm:p-6 lg:grid-cols-4"
        >
          {stats.map((item) => (
            <motion.div key={item.label} variants={itemVariants} className="text-center">
              <StatCounter {...item} />
              <p className="mt-2 text-sm font-extrabold uppercase tracking-[0.14em] text-muted">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-ink/10 bg-night p-6 text-center text-white shadow-premium sm:p-8"
        >
          <p className="font-display text-2xl font-bold md:text-3xl">Ready to find your dream property?</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_0_42px_rgba(212,175,55,0.45)] sm:w-auto"
          >
            Book A Free Consultation
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function StatCounter({ value, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 1400;
        const startTime = performance.now();

        const animate = (time) => {
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p ref={ref} className="font-display text-3xl font-bold text-ink md:text-4xl">
      {prefix}
      {count}
      {suffix}
    </p>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading testimonials">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-[360px] animate-pulse rounded-2xl border border-ink/10 bg-white/85 shadow-soft" />
      ))}
    </div>
  );
}

function TestimonialState({ title, message }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/85 p-5 text-center shadow-soft md:p-8">
      <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">
        {title.includes('could not load') || title.includes('No testimonials') ? 'No testimonials available currently.' : title}
      </h3>
      {!title.includes('could not load') && !title.includes('No testimonials') && <p className="mx-auto mt-3 max-w-xl leading-8 text-muted">{message}</p>}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group flex h-full min-h-[340px] flex-col rounded-2xl border border-ink/10 bg-white/85 p-6 shadow-soft backdrop-blur-xl transition-shadow hover:shadow-premium sm:min-h-[360px] sm:p-7"
    >
      <div className="mb-7 flex items-start justify-between gap-5">
        <div className="flex items-center gap-4">
          <img
            src={testimonial.image?.url || testimonial.image}
            alt={`${testimonial.name}, ${COMPANY_INFO.companyName} client from ${testimonial.location}`}
            loading="lazy"
            className="h-16 w-16 rounded-full border-2 border-gold/60 object-cover shadow-soft transition-transform duration-300 group-hover:scale-105"
          />
          <div>
            <h3 className="font-display text-xl font-bold text-ink">{testimonial.name}</h3>
            <p className="text-sm font-semibold text-muted">{testimonial.location}</p>
          </div>
        </div>
        <FaQuoteLeft className="text-3xl text-gold/45" aria-hidden="true" />
      </div>

      <div className="mb-5 flex gap-1 text-gold" aria-label={`${testimonial.rating} star rating`}>
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <FaStar key={index} aria-hidden="true" />
        ))}
      </div>

      <p className="leading-8 text-muted">{testimonial.review}</p>
    </motion.article>
  );
}
