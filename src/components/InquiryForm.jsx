import { motion } from 'framer-motion';
import { useState } from 'react';
import inquiryService from '../services/inquiryService';
import { trackEvent } from '../utils/tracking';

const inputClass =
  'min-h-12 w-full min-w-0 rounded-lg border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15';

export default function InquiryForm({ property }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus('');
    try {
      await inquiryService.createInquiry({
        ...form,
        property: property._id,
        leadSource: 'website',
        preferredLocation: property.city || property.location,
      });
      trackEvent('inquiry_submit', {
        property_id: property._id,
        property_title: property.title,
        city: property.city,
      });
      setStatus('Inquiry submitted successfully. Our team will contact you shortly.');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('Unable to submit inquiry right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      className="rounded-lg border border-ink/10 bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:p-7 lg:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Send Inquiry</h2>
      <p className="mt-3 max-w-3xl leading-8 text-muted">Ask our advisory team about pricing, documents, and availability.</p>
      <form onSubmit={submit} className="mt-7 grid gap-4 md:grid-cols-2">
        <Field label="Full Name"><input className={inputClass} value={form.name} onChange={(e) => update('name', e.target.value)} required /></Field>
        <Field label="Phone Number"><input className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} required /></Field>
        <Field label="Email Address"><input className={inputClass} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></Field>
        <Field label="Property"><input className={inputClass} value={property.title} readOnly /></Field>
        <Field label="Message" span><textarea className={`${inputClass} min-h-32`} value={form.message} onChange={(e) => update('message', e.target.value)} required /></Field>
        {status && <p className="text-sm font-semibold text-muted md:col-span-2">{status}</p>}
        <button disabled={submitting} className="min-h-12 rounded-lg bg-gold px-6 py-4 text-xs font-extrabold uppercase tracking-[0.1em] text-night transition-colors hover:bg-night hover:text-white disabled:opacity-60 sm:text-sm sm:tracking-[0.14em] md:col-span-2" type="submit">
          {submitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </motion.section>
  );
}

function Field({ label, children, span }) {
  return <label className={`grid min-w-0 gap-2 text-sm font-bold text-ink ${span ? 'md:col-span-2' : ''}`}>{label}{children}</label>;
}
