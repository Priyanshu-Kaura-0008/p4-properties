import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import omPrakashDhiman from '../assets/founders/om-prakash-dhiman.svg';
import pardeepAggarwal from '../assets/founders/pardeep-aggarwal.svg';
import pardeepGarg from '../assets/founders/pardeep-garg.svg';
import priyanshuKaura from '../assets/founders/priyanshu-kaura.svg';

const founders = [
  {
    name: 'Priyanshu Kaura',
    title: 'Director',
    image: priyanshuKaura,
  },
  {
    name: 'Pardeep Garg',
    title: 'Director',
    image: pardeepGarg,
  },
  {
    name: 'Om Prakash Dhiman',
    title: 'Director',
    image: omPrakashDhiman,
  },
  {
    name: 'Pardeep Aggarwal',
    title: 'Director',
    image: pardeepAggarwal,
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

export default function FoundersSection() {
  return (
    <motion.section
      id="founders"
      className="relative overflow-hidden bg-white py-16 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(17,17,17,0.08),transparent_30%)]" />
      <div className="container-p4 relative z-10">
        <motion.div variants={cardVariants} className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Leadership</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">Meet Our Founders</h2>
          <p className="mt-4 text-base leading-8 text-muted md:text-lg">
            Driven by trust, expertise, and a shared vision for redefining real estate experiences.
          </p>
        </motion.div>

        <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" variants={sectionVariants}>
          {founders.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-ink/10 bg-ivory/80 p-6 text-center shadow-soft backdrop-blur-xl sm:p-8"
        >
          <p className="font-display text-2xl font-bold text-ink">Looking for expert real estate guidance?</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-night px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-soft transition-all hover:-translate-y-1 hover:bg-gold hover:text-night hover:shadow-premium sm:w-auto"
          >
            Schedule a Consultation
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function FounderCard({ founder }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="group flex h-full min-h-[320px] flex-col items-center rounded-2xl border border-ink/10 bg-white/80 p-6 text-center shadow-soft backdrop-blur-xl transition-shadow hover:shadow-premium sm:min-h-[360px] sm:p-7"
    >
      <div className="relative rounded-full border border-gold/45 bg-gold/10 p-2 shadow-[0_18px_50px_rgba(17,17,17,0.14)]">
        <div className="overflow-hidden rounded-full">
          <motion.img
            src={founder.image}
            alt={`${founder.name}, ${founder.title} at P4 Properties`}
            className="h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>

      <div className="my-5 flex w-20 items-center justify-center gap-2 sm:my-7" aria-hidden="true">
        <span className="h-px flex-1 bg-gold/55" />
        <span className="h-2 w-2 rotate-45 bg-gold" />
        <span className="h-px flex-1 bg-gold/55" />
      </div>

      <h3 className="font-display text-2xl font-bold leading-tight text-ink">{founder.name}</h3>
      <p className="mt-2 text-sm font-extrabold uppercase tracking-[0.18em] text-gold">{founder.title}</p>
      <p className="mt-5 leading-7 text-muted">
        Guiding clients with measured insight, local expertise, and a commitment to long-term value.
      </p>
    </motion.article>
  );
}
