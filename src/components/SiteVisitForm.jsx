import { motion } from 'framer-motion';

const inputClass =
  'h-13 w-full rounded-md border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15';

export default function SiteVisitForm({ propertyTitle }) {
  return (
    <motion.section
      id="site-visit"
      className="rounded-md bg-white p-7 shadow-soft"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-3xl font-bold text-ink">Schedule a Private Site Visit</h2>
      <p className="mt-3 leading-8 text-muted">Share your preferred timing and our advisory team will coordinate a discreet visit for {propertyTitle}.</p>
      <form className="mt-7 grid gap-4 md:grid-cols-2">
        <label className="sr-only" htmlFor="full-name">Full Name</label>
        <input id="full-name" className={inputClass} placeholder="Full Name" required />
        <label className="sr-only" htmlFor="phone-number">Phone Number</label>
        <input id="phone-number" className={inputClass} placeholder="Phone Number" required />
        <label className="sr-only" htmlFor="email-address">Email Address</label>
        <input id="email-address" className={inputClass} type="email" placeholder="Email Address" />
        <label className="sr-only" htmlFor="visit-date">Preferred Visit Date</label>
        <input id="visit-date" className={inputClass} type="date" />
        <label className="sr-only" htmlFor="visit-time">Preferred Time</label>
        <input id="visit-time" className={inputClass} type="time" />
        <label className="sr-only" htmlFor="message">Message</label>
        <textarea id="message" className={`${inputClass} min-h-32 md:col-span-2`} placeholder="Message" />
        <button className="bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-night hover:text-white md:col-span-2" type="submit">
          Schedule Site Visit
        </button>
      </form>
    </motion.section>
  );
}
