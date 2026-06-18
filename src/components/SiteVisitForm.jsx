import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import siteVisitService from '../services/siteVisitService';
import { trackEvent } from '../utils/tracking';

const inputClass =
  'h-13 w-full rounded-md border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15';

export default function SiteVisitForm({ propertyTitle }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    remarks: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await siteVisitService.createSiteVisit({
        ...form,
        address: propertyTitle || 'General',
        preferredLocation: propertyTitle || 'General',
        budget: 'Not specified',
        propertyType: 'Not specified',
        leadSource: 'website',
      });
      trackEvent('site_visit_submit', { source: 'site_visit_form', property_title: propertyTitle });
      toast.success('Site visit booked successfully');
      setForm({ name: '', phone: '', email: '', preferredDate: '', preferredTime: '', remarks: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to book site visit');
    } finally {
      setSubmitting(false);
    }
  };

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
      <form onSubmit={submit} className="mt-7 grid gap-4 md:grid-cols-2">
        <label className="sr-only" htmlFor="full-name">Full Name</label>
        <input id="full-name" className={inputClass} placeholder="Full Name" value={form.name} onChange={(event) => update('name', event.target.value)} required />
        <label className="sr-only" htmlFor="phone-number">Phone Number</label>
        <input id="phone-number" className={inputClass} placeholder="Phone Number" value={form.phone} onChange={(event) => update('phone', event.target.value)} required />
        <label className="sr-only" htmlFor="email-address">Email Address</label>
        <input id="email-address" className={inputClass} type="email" placeholder="Email Address" value={form.email} onChange={(event) => update('email', event.target.value)} />
        <label className="sr-only" htmlFor="visit-date">Preferred Visit Date</label>
        <input id="visit-date" className={inputClass} type="date" value={form.preferredDate} onChange={(event) => update('preferredDate', event.target.value)} required />
        <label className="sr-only" htmlFor="visit-time">Preferred Time</label>
        <input id="visit-time" className={inputClass} type="time" value={form.preferredTime} onChange={(event) => update('preferredTime', event.target.value)} />
        <label className="sr-only" htmlFor="message">Message</label>
        <textarea id="message" className={`${inputClass} min-h-32 md:col-span-2`} placeholder="Message" value={form.remarks} onChange={(event) => update('remarks', event.target.value)} />
        <button disabled={submitting} className="rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-night hover:text-white disabled:opacity-60 md:col-span-2" type="submit">
          {submitting ? 'Scheduling...' : 'Schedule Site Visit'}
        </button>
      </form>
    </motion.section>
  );
}
