import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaUserTie, FaWhatsapp } from 'react-icons/fa';
import { COMPANY_INFO, CONTACT_LINKS } from '../constants/companyInfo';
import { trackEvent } from '../utils/tracking';

export default function StickyAgentCard({ propertyTitle }) {
  return (
    <motion.aside
      className="sticky top-24 rounded-md border border-ink/10 bg-white p-6 shadow-premium"
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 border-b border-ink/10 pb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ivory text-3xl text-gold">
          <FaUserTie aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">{COMPANY_INFO.companyName} Team</h2>
          <p className="mt-1 text-sm font-semibold text-muted">Private property advisor</p>
        </div>
      </div>
      <div className="grid gap-3 py-6 text-sm font-semibold text-muted">
        <p className="flex items-center gap-3">
          <FaPhoneAlt className="text-gold" aria-hidden="true" />
          {COMPANY_INFO.primaryPhone}
        </p>
        <p className="flex items-center gap-3">
          <FaEnvelope className="text-gold" aria-hidden="true" />
          {COMPANY_INFO.email}
        </p>
      </div>
      <div className="grid gap-3">
        <a href="/site-visit" className="rounded-xl bg-gold px-5 py-3 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-night transition-colors hover:bg-night hover:text-white">
          Schedule Site Visit
        </a>
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=I%20am%20interested%20in%20${encodeURIComponent(propertyTitle)}`}
          onClick={() => trackEvent('whatsapp_click', { source: 'sticky_agent_card', property_title: propertyTitle })}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-ink transition-colors hover:border-gold hover:text-gold"
        >
          <FaWhatsapp aria-hidden="true" />
          WhatsApp Inquiry
        </a>
        <a href={CONTACT_LINKS.phone} onClick={() => trackEvent('phone_click', { source: 'sticky_agent_card', property_title: propertyTitle })} className="rounded-xl border border-ink/15 px-5 py-3 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-ink transition-colors hover:border-gold hover:text-gold">
          Call Now
        </a>
      </div>
    </motion.aside>
  );
}
