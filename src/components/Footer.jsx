import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaChevronDown,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, CONTACT_LINKS } from '../constants/companyInfo';
import { locationSlug } from '../utils/seo';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/#about-us' },
  { label: 'Locations', to: '/#locations' },
  { label: 'Services', to: '/#services' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact', to: '/contact' },
];

const locations = COMPANY_INFO.serviceAreas;

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-conditions' },
  { label: 'Disclaimer', to: '/disclaimer' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
];

const socialLinks = [
  { label: 'Instagram', href: COMPANY_INFO.social.instagram || '#', icon: FaInstagram },
  { label: 'Facebook', href: COMPANY_INFO.social.facebook || '#', icon: FaFacebookF },
  { label: 'LinkedIn', href: COMPANY_INFO.social.linkedin || '#', icon: FaLinkedinIn },
  { label: 'WhatsApp', href: CONTACT_LINKS.whatsapp, icon: FaWhatsapp },
];

const contactNumbers = COMPANY_INFO.directors.map((director) => director.phone);

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
  const [openSection, setOpenSection] = useState('');
  const [brandFirst, ...brandRestParts] = COMPANY_INFO.companyName.split(' ');
  const brandRest = brandRestParts.join(' ');

  return (
    <motion.footer
      className="relative overflow-hidden bg-night text-white"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(212,175,55,0.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_40%)]" />

      <div className="container-p4 relative z-10 py-8 text-center md:py-16 md:text-left">
        <motion.div variants={itemVariants} className="flex flex-col items-center md:hidden">
          <Link to="/" className="inline-flex flex-col" aria-label={`${COMPANY_INFO.companyName} home`}>
            <span className="font-display text-2xl font-bold leading-none">
              {brandFirst} <span className="text-gold">{brandRest}</span>
            </span>
            <span className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold">
              {COMPANY_INFO.tagline}
            </span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/68">
            At {COMPANY_INFO.companyName}, we help clients discover exceptional residential, commercial, and investment opportunities
            across Chandigarh Tricity and surrounding growth corridors.
          </p>
          <SocialLinks />

          <div className="mt-7 grid w-full gap-3">
            <FooterAccordion title="Quick Links" open={openSection === 'links'} onClick={() => setOpenSection(openSection === 'links' ? '' : 'links')}>
              {quickLinks.map((link) => (
                <Link key={link.label} to={link.to} className={footerLinkClass}>
                  {link.label}
                </Link>
              ))}
            </FooterAccordion>
            <FooterAccordion title="Locations" open={openSection === 'locations'} onClick={() => setOpenSection(openSection === 'locations' ? '' : 'locations')}>
              {locations.map((location) => (
                <Link key={location} to={`/locations/${locationSlug(location)}`} className={footerLinkClass}>
                  {location}
                </Link>
              ))}
            </FooterAccordion>
            <FooterAccordion title="Legal" open={openSection === 'legal'} onClick={() => setOpenSection(openSection === 'legal' ? '' : 'legal')}>
              {legalLinks.map((link) => (
                <Link key={link.label} to={link.to} className={footerLinkClass}>
                  {link.label}
                </Link>
              ))}
            </FooterAccordion>
            <FooterAccordion title="Contact" open={openSection === 'contact'} onClick={() => setOpenSection(openSection === 'contact' ? '' : 'contact')}>
              <div className="grid gap-3">
                {contactNumbers.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="font-semibold text-white/78 transition-colors hover:text-gold">
                    {phone}
                  </a>
                ))}
                <a href={CONTACT_LINKS.email} className="break-words font-semibold text-white/78 transition-colors hover:text-gold">
                  {COMPANY_INFO.email}
                </a>
                <p className="text-white/60">{COMPANY_INFO.officeAddress}</p>
              </div>
            </FooterAccordion>
          </div>
        </motion.div>

        <div className="hidden gap-10 md:grid md:grid-cols-2 xl:grid-cols-[1.2fr_0.75fr_0.9fr_0.85fr_1.2fr]">
        <motion.div variants={itemVariants} className="flex flex-col items-start">
          <Link to="/" className="inline-flex flex-col" aria-label={`${COMPANY_INFO.companyName} home`}>
            <span className="font-display text-4xl font-bold leading-none">
              {brandFirst} <span className="text-gold">{brandRest}</span>
            </span>
            <span className="mt-3 text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
              {COMPANY_INFO.tagline}
            </span>
          </Link>
          <p className="mt-6 max-w-md leading-8 text-white/68">
            At {COMPANY_INFO.companyName}, we help clients discover exceptional residential, commercial, and investment opportunities
            across Chandigarh Tricity and surrounding growth corridors.
          </p>
          <SocialLinks />
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

        <FooterColumn title="Legal">
          {legalLinks.map((link) => (
            <Link key={link.label} to={link.to} className={footerLinkClass}>
              {link.label}
            </Link>
          ))}
        </FooterColumn>

        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
          <h3 className="mb-5 font-display text-xl font-bold">Contact Information</h3>
          <address className="grid gap-6 text-sm not-italic leading-7 text-white/68">
            <div className="grid gap-3">
              <p className="flex items-center justify-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-gold md:justify-start">
                <FaPhoneAlt aria-hidden="true" />
                Phone Numbers
              </p>
              <div className="grid gap-2 md:pl-7">
                {contactNumbers.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="font-semibold text-white/78 transition-colors hover:text-gold">
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <p className="flex items-center justify-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-gold md:justify-start">
                <FaEnvelope aria-hidden="true" />
                Email
              </p>
              <a href={CONTACT_LINKS.email} className="break-words font-semibold text-white/78 transition-colors hover:text-gold md:pl-7">
                {COMPANY_INFO.email}
              </a>
            </div>

            <p className="grid gap-3">
              <span className="flex items-center justify-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-gold md:justify-start">
                <FaMapMarkerAlt aria-hidden="true" />
                Address
              </span>
              <span className="text-white/68 md:pl-7">{COMPANY_INFO.officeAddress}</span>
            </p>
          </address>
        </motion.div>
        </div>
      </div>

      <motion.div
        variants={itemVariants}
        className="relative z-10 border-t border-white/10 px-4 py-7 text-center"
      >
        <p className="mb-3 font-display text-lg font-bold text-white md:text-xl">
          Building Futures Through Real Estate Excellence.
        </p>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/55 md:flex-row">
          <p>Copyright {new Date().getFullYear()} {COMPANY_INFO.companyName}. All rights reserved.</p>
          <div className="hidden flex-wrap items-center justify-center gap-4 md:flex">
            {legalLinks.map((link, index) => (
              <span key={link.label} className="flex items-center gap-4">
                {index > 0 && <span aria-hidden="true">|</span>}
                <Link to={link.to} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </span>
            ))}
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

function SocialLinks() {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start" aria-label={`${COMPANY_INFO.companyName} social links`}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${COMPANY_INFO.companyName} on ${social.label}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-white transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-night hover:shadow-[0_0_28px_rgba(212,175,55,0.35)] md:h-11 md:w-11 md:text-base"
          >
            <Icon aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

function FooterAccordion({ title, open, onClick, children }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left">
      <button
        type="button"
        className="flex min-h-11 w-full items-center justify-between px-4 font-display text-base font-bold text-white"
        onClick={onClick}
        aria-expanded={open}
      >
        {title}
        <FaChevronDown className={`text-sm text-gold transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && <div className="grid gap-2 border-t border-white/10 px-4 py-3 text-sm text-white/68">{children}</div>}
    </article>
  );
}
