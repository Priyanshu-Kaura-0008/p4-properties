import { useState } from 'react';
import toast from 'react-hot-toast';
import FloatingActions from '../components/FloatingActions';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { COMPANY_INFO } from '../constants/companyInfo';
import siteVisitService from '../services/siteVisitService';
import { breadcrumbSchema } from '../utils/seo';

const inputClass =
  'min-h-12 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15';

const locations = ['Chandigarh', 'Mohali', 'Panchkula', 'New Chandigarh', 'Kharar', 'Kurali', 'Rajpura', 'Zirakpur'];
const propertyTypes = ['Apartment', 'Villa', 'Independent Floor', 'Plot', 'SCO', 'Shop', 'Office', 'Commercial Land'];
const budgets = ['Under Rs. 50 Lakhs', 'Rs. 50 Lakhs - Rs. 1 Crore', 'Rs. 1 Crore - Rs. 2 Crores', 'Rs. 2 Crores - Rs. 5 Crores', 'Above Rs. 5 Crores'];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  preferredLocation: '',
  propertyType: '',
  budget: '',
  preferredDate: '',
  remarks: '',
};

export default function SiteVisitPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await siteVisitService.createSiteVisit({
        ...form,
        address: form.preferredLocation,
        preferredTime: 'Flexible',
        leadSource: 'website',
      });
      toast.success('Site visit booked successfully');
      setForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to book site visit');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-white text-ink">
      <SEO
        title={`Book Site Visit | ${COMPANY_INFO.companyName}`}
        description={`Book a private site visit with ${COMPANY_INFO.companyName} for residential and commercial properties across Chandigarh Tricity.`}
        canonical="/site-visit"
        structuredData={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Site Visit', path: '/site-visit' }])]}
      />
      <Navbar />

      <section className="relative overflow-hidden bg-night px-4 pb-16 pt-28 text-white md:pb-20 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,175,55,.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.08),transparent_42%)]" />
        <div className="container-p4 relative z-10 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Private Property Visit</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-7xl">Schedule a Site Visit</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
            Share your preference and our advisory team will coordinate verified property visits across Tricity.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-10 md:hidden">
        <div className="container-p4">
          <div className="mb-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/10 bg-white p-1 shadow-soft">
            {[
              ['why', 'Why Choose P4'],
              ['form', 'Book Visit'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setActiveTab(value)}
                className={`min-h-11 rounded-xl text-sm font-extrabold uppercase tracking-[0.12em] transition-colors ${
                  activeTab === value ? 'bg-night text-white' : 'text-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'why' ? <WhyChooseP4 /> : (
            <SiteVisitForm form={form} update={update} submit={submit} submitting={submitting} />
          )}
        </div>
      </section>

      <section className="hidden bg-ivory py-16 md:block">
        <div className="container-p4">
          <SiteVisitForm form={form} update={update} submit={submit} submitting={submitting} />
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}

function WhyChooseP4() {
  return (
    <article className="rounded-2xl border border-ink/10 bg-white p-5 shadow-premium">
      <h2 className="font-display text-2xl font-bold text-ink">Why Choose P4</h2>
      <div className="mt-4 grid gap-3">
        {[
          'Verified residential and commercial options.',
          'Private site visits planned around your schedule.',
          'Local advisory across Chandigarh Tricity.',
          'Transparent guidance before every visit.',
        ].map((item) => (
          <p key={item} className="rounded-xl bg-ivory px-4 py-3 text-sm font-semibold leading-6 text-muted">
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}

function SiteVisitForm({ form, update, submit, submitting }) {
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-5 shadow-premium sm:p-7 md:grid-cols-2">
      <Field label="Name"><input className={inputClass} value={form.name} onChange={(e) => update('name', e.target.value)} required /></Field>
      <Field label="Phone Number"><input className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} required /></Field>
      <Field label="Email"><input className={inputClass} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></Field>
      <Field label="Preferred Location">
        <select className={inputClass} value={form.preferredLocation} onChange={(e) => update('preferredLocation', e.target.value)} required>
          <option value="">Select Location</option>
          {locations.map((location) => <option key={location}>{location}</option>)}
        </select>
      </Field>
      <Field label="Property Type">
        <select className={inputClass} value={form.propertyType} onChange={(e) => update('propertyType', e.target.value)} required>
          <option value="">Select Property Type</option>
          {propertyTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
      </Field>
      <Field label="Budget">
        <select className={inputClass} value={form.budget} onChange={(e) => update('budget', e.target.value)} required>
          <option value="">Select Budget</option>
          {budgets.map((budget) => <option key={budget}>{budget}</option>)}
        </select>
      </Field>
      <Field label="Preferred Visit Date"><input className={inputClass} type="date" min={new Date().toISOString().slice(0, 10)} value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} required /></Field>
      <Field label="Message" span><textarea className={`${inputClass} min-h-24 md:min-h-32`} value={form.remarks} onChange={(e) => update('remarks', e.target.value)} /></Field>
      <button disabled={submitting} className="min-h-12 rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-night hover:text-white disabled:opacity-60 md:col-span-2" type="submit">
        {submitting ? 'Submitting...' : 'Book Site Visit'}
      </button>
    </form>
  );
}

function Field({ label, children, span }) {
  return <label className={`grid gap-2 text-sm font-bold text-ink ${span ? 'md:col-span-2' : ''}`}>{label}{children}</label>;
}
