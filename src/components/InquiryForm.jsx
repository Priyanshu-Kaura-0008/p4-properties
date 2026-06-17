import { motion } from 'framer-motion';
import { useState } from 'react';
import adminApi from '../api/adminApi';

const inputClass =
  'w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15';

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
      await adminApi.post('/inquiries', { ...form, property: property._id });
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
      className="rounded-2xl border border-ink/10 bg-white/85 p-7 shadow-soft backdrop-blur-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-3xl font-bold text-ink">Send Inquiry</h2>
      <p className="mt-3 leading-8 text-muted">Ask our advisory team about pricing, documents, and availability.</p>
      <form onSubmit={submit} className="mt-7 grid gap-4 md:grid-cols-2">
        <Field label="Full Name"><input className={inputClass} value={form.name} onChange={(e) => update('name', e.target.value)} required /></Field>
        <Field label="Phone Number"><input className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} required /></Field>
        <Field label="Email Address"><input className={inputClass} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></Field>
        <Field label="Property"><input className={inputClass} value={property.title} readOnly /></Field>
        <Field label="Message" span><textarea className={`${inputClass} min-h-32`} value={form.message} onChange={(e) => update('message', e.target.value)} required /></Field>
        {status && <p className="text-sm font-semibold text-muted md:col-span-2">{status}</p>}
        <button disabled={submitting} className="rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-night hover:text-white disabled:opacity-60 md:col-span-2" type="submit">
          {submitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </motion.section>
  );
}

function Field({ label, children, span }) {
  return <label className={`grid gap-2 text-sm font-bold text-ink ${span ? 'md:col-span-2' : ''}`}>{label}{children}</label>;
}
