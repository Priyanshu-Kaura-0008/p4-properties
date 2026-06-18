import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import FloatingActions from '../components/FloatingActions';
import ContactInquiryForm from '../components/ContactInquiryForm';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { COMPANY_INFO, CONTACT_LINKS } from '../constants/companyInfo';
import { breadcrumbSchema } from '../utils/seo';

const directors = COMPANY_INFO.directors;

const officeMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY_INFO.officeAddress)}`;

export default function ContactPage() {
  const [openPanel, setOpenPanel] = useState('office');

  return (
    <main className="bg-white text-ink">
      <SEO
        title={`Contact ${COMPANY_INFO.companyName} | Property Dealer Chandigarh`}
        description={`Contact ${COMPANY_INFO.companyName} for property consultation, site visits, residential properties in Mohali, commercial properties in Chandigarh, and luxury homes in Panchkula.`}
        canonical="/contact"
        structuredData={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]}
      />
      <Navbar />
      <section className="bg-night px-4 pb-12 pt-24 text-center text-white md:pb-16 md:pt-32">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Contact {COMPANY_INFO.companyName}</p>
        <h1 className="font-display text-4xl font-bold md:text-7xl">Book a Private Consultation</h1>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/70 md:mt-5 md:leading-8">
          Visit our Zirakpur office, call our directors, or share your requirements for verified property guidance.
        </p>
      </section>
      <section className="bg-ivory py-10 md:py-16">
        <div className="container-p4 lg:hidden">
          <div className="grid gap-3">
            <ContactAccordion title="Office Address" open={openPanel === 'office'} onClick={() => setOpenPanel(openPanel === 'office' ? '' : 'office')}>
              <p className="leading-7 text-muted">
                {COMPANY_INFO.officeAddress}
              </p>
              <a href={officeMapUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-night px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white">
                Google Maps
              </a>
            </ContactAccordion>

            <ContactAccordion title="Call Us" open={openPanel === 'call'} onClick={() => setOpenPanel(openPanel === 'call' ? '' : 'call')}>
              <div className="grid grid-cols-2 gap-3">
                {directors.map(({ name, phone, whatsapp }) => (
                  <div key={whatsapp} className="rounded-xl border border-ink/10 bg-ivory p-3">
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold">Director</p>
                    <p className="mt-1 font-display text-base font-bold leading-tight text-ink">{name.replace('Priyanshu Kaura', 'Priyanshu').replace('Pardeep Aggarwal', 'Pardeep A.')}</p>
                    <p className="mt-1 text-sm font-bold text-muted">{phone}</p>
                    <div className="mt-3 grid gap-2">
                      <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-night px-3 text-xs font-extrabold uppercase tracking-[0.12em] text-white">Call</a>
                      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-ink/15 px-3 text-xs font-extrabold uppercase tracking-[0.12em] text-ink">WhatsApp</a>
                    </div>
                  </div>
                ))}
              </div>
            </ContactAccordion>

            <ContactAccordion title="Email" open={openPanel === 'email'} onClick={() => setOpenPanel(openPanel === 'email' ? '' : 'email')}>
              <a href={CONTACT_LINKS.email} className="break-words font-semibold text-ink">
                {COMPANY_INFO.email}
              </a>
            </ContactAccordion>

            <ContactAccordion title="Map" open={openPanel === 'map'} onClick={() => setOpenPanel(openPanel === 'map' ? '' : 'map')}>
              <iframe
                title={`${COMPANY_INFO.companyName} office location compact map`}
                src={`${officeMapUrl}&output=embed`}
                className="h-56 w-full rounded-xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </ContactAccordion>
          </div>
        </div>

        <div className="container-p4 hidden gap-8 lg:grid lg:grid-cols-[0.95fr_1.15fr]">
          <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-night p-6 text-white shadow-premium sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,.2),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.08),transparent_46%)]" />
            <div className="relative z-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">Office Address</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{COMPANY_INFO.companyName}</h2>
              <p className="mt-6 leading-8 text-white/72">
                {COMPANY_INFO.officeAddress}
              </p>
              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold">Email</p>
                <a href={CONTACT_LINKS.email} className="mt-2 block break-words font-semibold text-white transition-colors hover:text-gold">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a href={officeMapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:border-gold hover:text-gold">
                  Google Maps
                </a>
                <a href={CONTACT_LINKS.phone} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gold px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-night transition-colors hover:bg-white">
                  Call Now
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {directors.map(({ name, phone, whatsapp }) => (
              <article key={whatsapp} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-premium">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold">Director</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink">{name}</h3>
                <p className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">{phone}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-night px-4 py-3 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold hover:text-night">
                    Call
                  </a>
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-ink/15 px-4 py-3 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:text-gold">
                    WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactInquiryForm />
      <section className="hidden bg-white py-16 lg:block">
        <div className="container-p4 overflow-hidden rounded-2xl border border-ink/10 bg-ivory shadow-soft">
          <iframe
            title={`${COMPANY_INFO.companyName} office location`}
            src={`${officeMapUrl}&output=embed`}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <Footer />
      <FloatingActions />
    </main>
  );
}

function ContactAccordion({ title, open, onClick, children }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-between gap-4 px-4 text-left font-display text-lg font-bold text-ink"
        onClick={onClick}
        aria-expanded={open}
      >
        {title}
        <FaChevronDown className={`text-sm text-gold transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && <div className="border-t border-ink/10 px-4 py-3">{children}</div>}
    </article>
  );
}
