import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../constants/companyInfo';

export default function LegalPageLayout({ title, description, canonical, sections }) {
  return (
    <main className="bg-white text-ink">
      <SEO title={`${title} | ${COMPANY_INFO.companyName}`} description={description} canonical={canonical} />
      <Navbar />

      <section className="relative overflow-hidden bg-night px-4 pb-16 pt-28 text-white md:pb-20 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,175,55,.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.08),transparent_42%)]" />
        <div className="container-p4 relative z-10">
          <SectionHeading eyebrow="Legal Information" title={title} subtitle={description} light />
        </div>
      </section>

      <section className="bg-ivory py-12 md:py-16">
        <div className="container-p4 grid gap-6">
          {sections.map((section) => (
            <article key={section.title} className="rounded-md border border-ink/10 bg-white p-6 shadow-soft md:p-8">
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">{section.title}</h2>
              <div className="mt-4 grid gap-4 leading-8 text-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}

          <section className="py-10 text-center md:py-14">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold">Need Assistance?</p>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted">
              For legal, privacy, support or property-related queries, our team is here to help.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-night px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-soft transition-all hover:-translate-y-1 hover:bg-gold hover:text-night hover:shadow-premium"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
