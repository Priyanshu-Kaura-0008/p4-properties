import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    location: 'Mohali',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    review:
      'P4 Properties helped us find the perfect villa in Mohali. The entire process was transparent and professional.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Neha Gupta',
    location: 'Chandigarh',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    review: 'Their market knowledge and investment advice helped us make a confident property decision.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amit Bansal',
    location: 'Panchkula',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    review: 'Highly professional team. They guided us from property selection to final registration.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Karan Arora',
    location: 'New Chandigarh',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    review: 'Excellent service and genuine property recommendations. Highly recommended.',
    rating: 5,
  },
];

const stats = [
  { value: '500+', label: 'Properties Sold' },
  { value: '300+', label: 'Happy Clients' },
  { value: 'Rs. 100+ Cr', label: 'Transactions' },
  { value: '100%', label: 'Transparency' },
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
  return (
    <motion.section
      id="testimonials"
      className="relative overflow-hidden bg-ivory py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.12),transparent_36%),radial-gradient(circle_at_80%_18%,rgba(17,17,17,0.08),transparent_30%)]" />
      <div className="container-p4 relative z-10">
        <motion.div variants={itemVariants} className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Client Stories</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted">
            Trusted by homebuyers, investors, and businesses across Chandigarh Tricity.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
              <SwiperSlide key={testimonial.id} className="h-auto">
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="mt-12 grid gap-4 rounded-2xl border border-white/70 bg-white/75 p-6 shadow-soft backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((item) => (
            <motion.div key={item.label} variants={itemVariants} className="text-center">
              <p className="font-display text-4xl font-bold text-ink">{item.value}</p>
              <p className="mt-2 text-sm font-extrabold uppercase tracking-[0.14em] text-muted">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-ink/10 bg-night p-8 text-center text-white shadow-premium"
        >
          <p className="font-display text-3xl font-bold">Ready to find your dream property?</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_0_42px_rgba(212,175,55,0.45)]"
          >
            Book a Free Consultation
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group flex h-full min-h-[360px] flex-col rounded-2xl border border-ink/10 bg-white/85 p-7 shadow-soft backdrop-blur-xl transition-shadow hover:shadow-premium"
    >
      <div className="mb-7 flex items-start justify-between gap-5">
        <div className="flex items-center gap-4">
          <img
            src={testimonial.image}
            alt={`${testimonial.name}, P4 Properties client from ${testimonial.location}`}
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
