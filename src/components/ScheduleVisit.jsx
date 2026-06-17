import { motion } from 'framer-motion';
import { useState } from 'react';
import adminApi from '../api/adminApi';
import { locationOptions } from '../data/siteData';

const inputClass =
  'w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15';

const budgetOptions = ['Under Rs. 50 Lakhs', 'Rs. 50 Lakhs - Rs. 1 Crore', 'Rs. 1 Crore - Rs. 2 Crores', 'Rs. 2 Crores - Rs. 5 Crores', 'Above Rs. 5 Crores'];
const propertyTypes = ['Villa', 'Apartment', 'Independent Floor', 'Plot', 'SCO', 'Shop', 'Office', 'Commercial Land'];

const getInitialForm = (property) => ({
  name: '',
  phone: '',
  email: '',
  address: '',
  preferredLocation: property?.city || '',
  budget: '',
  propertyType: property?.propertyType || '',
  preferredDate: '',
  preferredTime: '',
  remarks: '',
});

export default function ScheduleVisit({ property }) {
  const [form, setForm] = useState(() => getInitialForm(property));
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus('');
    try {
      await adminApi.post('/site-visits', { ...form, property: property._id });
      setStatus('Site visit request submitted successfully.');
      setForm(getInitialForm(property));
    } catch (error) {
      setStatus(error.response?.data?.message || 'Unable to schedule visit right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      id="site-visit"
      className="rounded-2xl border border-ink/10 bg-white/85 p-7 shadow-soft backdrop-blur-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-3xl font-bold text-ink">Schedule a Site Visit</h2>
      <p className="mt-3 leading-8 text-muted">Share your preferred date and time for a private walkthrough.</p>
      <form onSubmit={submit} className="mt-7 grid gap-4 md:grid-cols-2">
        <Field label="Full Name"><input className={inputClass} value={form.name} onChange={(e) => update('name', e.target.value)} required /></Field>
        <Field label="Phone Number"><input className={inputClass} inputMode="numeric" pattern="[6-9][0-9]{9}" value={form.phone} onChange={(e) => update('phone', e.target.value)} required /></Field>
        <Field label="Email Address"><input className={inputClass} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></Field>
        <Field label="Address" span><input className={inputClass} value={form.address} onChange={(e) => update('address', e.target.value)} required /></Field>
        <Field label="Preferred Location">
          <select className={inputClass} value={form.preferredLocation} onChange={(e) => update('preferredLocation', e.target.value)} required>
            <option value="">Select Location</option>
            {locationOptions.map((location) => <option key={location}>{location}</option>)}
          </select>
        </Field>
        <Field label="Budget">
          <select className={inputClass} value={form.budget} onChange={(e) => update('budget', e.target.value)} required>
            <option value="">Select Budget</option>
            {budgetOptions.map((budget) => <option key={budget}>{budget}</option>)}
          </select>
        </Field>
        <Field label="Property Type">
          <select className={inputClass} value={form.propertyType} onChange={(e) => update('propertyType', e.target.value)} required>
            <option value="">Select Type</option>
            {propertyTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </Field>
        <Field label="Preferred Date"><input className={inputClass} type="date" min={new Date().toISOString().slice(0, 10)} value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} required /></Field>
        <Field label="Preferred Time"><input className={inputClass} type="time" value={form.preferredTime} onChange={(e) => update('preferredTime', e.target.value)} required /></Field>
        <Field label="Remarks" span><textarea className={`${inputClass} min-h-32`} value={form.remarks} onChange={(e) => update('remarks', e.target.value)} /></Field>
        {status && <p className="text-sm font-semibold text-muted md:col-span-2">{status}</p>}
        <button disabled={submitting} className="rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-night hover:text-white disabled:opacity-60 md:col-span-2" type="submit">
          {submitting ? 'Scheduling...' : 'Schedule Visit'}
        </button>
      </form>
    </motion.section>
  );
}

function Field({ label, children, span }) {
  return <label className={`grid gap-2 text-sm font-bold text-ink ${span ? 'md:col-span-2' : ''}`}>{label}{children}</label>;
}
