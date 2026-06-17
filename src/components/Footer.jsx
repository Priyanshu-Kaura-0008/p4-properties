import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { locationSlug } from '../utils/seo';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/#about-us' },
  { label: 'Locations', to: '/#locations' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact', to: '/contact' },
];

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

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
  { label: 'YouTube', href: 'https://youtube.com', icon: FaYoutube },
  { label: 'WhatsApp', href: 'https://wa.me/918195002006', icon: FaWhatsapp },
];

const footerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const footerLinkClass = 'transition-colors hover:text-gold';

export default function Footer() {
  return (
    <motion.footer
      className="relative overflow-hidden bg-night text-white"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(212,175,55,0.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_40%)]" />

      <div className="container-p4 relative z-10 grid gap-10 py-16 md:grid-cols-2 xl:grid-cols-[1.35fr_0.85fr_1fr_1.1fr]">
        <motion.div variants={itemVariants}>
          <Link to="/" className="inline-flex flex-col" aria-label="P4 Properties home">
            <span className="font-display text-4xl font-bold leading-none">
              P4 <span className="text-gold">Properties</span>
            </span>
            <span className="mt-3 text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
              Luxury &bull; Legacy &bull; Lifestyle
            </span>
          </Link>
          <p className="mt-6 max-w-md leading-8 text-white/68">
            At P4 Properties, we help clients discover exceptional residential, commercial, and investment opportunities
            across Chandigarh Tricity and surrounding growth corridors.
          </p>
          <div className="mt-7 flex flex-wrap gap-3" aria-label="P4 Properties social links">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit P4 Properties on ${social.label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-night hover:shadow-[0_0_28px_rgba(212,175,55,0.35)]"
                >
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </motion.div>

        <FooterColumn title="Quick Links">
          {quickLinks.map((link) => (
            <Link key={link.label} to={link.to} className={footerLinkClass}>
              {link.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Prime Locations">
          {locations.map((location) => (
            <Link
              key={location}
              to={`/locations/${locationSlug(location)}`}
              className={footerLinkClass}
            >
              {location}
            </Link>
          ))}
        </FooterColumn>

        <motion.div variants={itemVariants}>
          <h3 className="mb-5 font-display text-xl font-bold">Contact Information</h3>
          <address className="grid gap-4 text-sm not-italic leading-7 text-white/68">
            <a href="tel:+918195002006" className="flex gap-3 transition-colors hover:text-gold">
              <FaPhoneAlt className="mt-1 text-gold" aria-hidden="true" />
              <span>+91 81950 02006</span>
            </a>
            <a href="mailto:info@p4properties.com" className="flex gap-3 transition-colors hover:text-gold">
              <FaEnvelope className="mt-1 text-gold" aria-hidden="true" />
              <span>info@p4properties.com</span>
            </a>
            <p className="flex gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-gold" aria-hidden="true" />
              <span>SCO 00, Sector 00, Chandigarh</span>
            </p>
          </address>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="relative z-10 border-t border-white/10 px-4 py-7 text-center"
      >
        <p className="mb-4 font-display text-xl font-bold text-white">
          Building Futures Through Real Estate Excellence.
        </p>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/55 md:flex-row">
          <p>Copyright {new Date().getFullYear()} P4 Properties. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/privacy-policy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-gold">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <motion.nav variants={itemVariants} aria-label={title}>
      <h3 className="mb-5 font-display text-xl font-bold">{title}</h3>
      <div className="grid gap-3 text-sm text-white/68">{children}</div>
    </motion.nav>
  );
}
