import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaCalendarCheck, FaCheckCircle, FaHome, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { CONTACT_LINKS } from '../constants/companyInfo';
import { locationOptions } from '../data/siteData';
import siteVisitService from '../services/siteVisitService';
import { trackEvent } from '../utils/tracking';

const input =
  'w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold focus:ring-2 focus:ring-gold/20 [&_option]:bg-white [&_option]:text-night';

const benefits = ['Free Property Consultation', 'Verified Properties', 'Investment Guidance', 'Site Visit Assistance'];
const budgetOptions = ['Under Rs. 50 Lakhs', 'Rs. 50 Lakhs - Rs. 1 Crore', 'Rs. 1 Crore - Rs. 2 Crores', 'Rs. 2 Crores - Rs. 5 Crores', 'Above Rs. 5 Crores'];
const propertyTypes = ['Villa', 'Apartment', 'Independent Floor', 'Plot', 'SCO', 'Shop', 'Office', 'Commercial Land'];

export default function LeadGenerationSection() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const submit = async (values) => {
    try {
      await siteVisitService.createSiteVisit({
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        preferredLocation: values.preferredLocation,
        budget: values.budget,
        propertyType: values.propertyType,
        preferredDate: values.preferredDate,
        leadSource: 'website',
        remarks: values.remarks,
      });
      trackEvent('site_visit_submit', { source: 'lead_generation_section', preferred_location: values.preferredLocation });
      toast.success('Site visit request submitted');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to submit request');
    }
  };

  return (
    <motion.section
      id="book-site-visit"
      className="relative overflow-hidden bg-night py-24 text-white"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.08),transparent_44%)]" />
      <div className="container-p4 relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="text-center lg:text-left">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Private Property Advisory</p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-6xl">Schedule Your Site Visit Today</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70 md:mt-5 md:text-lg md:leading-8 lg:mx-0">
              Share your preference and our team will help shortlist verified options, plan your visit, and guide your investment decision.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:gap-4">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit}
                  whileHover={{ y: -4 }}
                  className="flex min-h-16 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur-xl md:justify-start md:gap-3 md:p-4 md:text-left"
                >
                  <FaCheckCircle className="shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-xs font-bold leading-5 md:text-base">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-9">
              <a href={CONTACT_LINKS.phone} onClick={() => trackEvent('phone_click', { source: 'lead_generation_section' })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-night transition-all hover:-translate-y-1 hover:bg-white">
                <FaPhoneAlt aria-hidden="true" />
                Call Now
              </a>
              <a href={CONTACT_LINKS.whatsapp} onClick={() => trackEvent('whatsapp_click', { source: 'lead_generation_section' })} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-gold hover:text-gold">
                <FaWhatsapp aria-hidden="true" />
                WhatsApp Us
              </a>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit(submit)}
            className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-[0_24px_90px_rgba(0,0,0,.35)] backdrop-blur-xl md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-night">
              <FaCalendarCheck aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-3xl font-bold">Book a Site Visit</h3>
              <p className="text-sm text-white/55">Fields marked with validation are required.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" error={errors.name?.message}><input className={input} {...register('name', { required: 'Name is required' })} /></Field>
            <Field label="Mobile Number" error={errors.phone?.message}>
              <input className={input} inputMode="numeric" {...register('phone', { required: 'Mobile number is required', pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' } })} />
            </Field>
            <Field label="Email"><input className={input} type="email" {...register('email')} /></Field>
            <Field label="Address" error={errors.address?.message} span><input className={input} {...register('address', { required: 'Address is required' })} /></Field>
            <Field label="Preferred Location" error={errors.preferredLocation?.message}>
              <select className={input} {...register('preferredLocation', { required: 'Preferred location is required' })}>
                <option value="">Select Location</option>
                {locationOptions.map((location) => <option key={location}>{location}</option>)}
              </select>
            </Field>
            <Field label="Budget" error={errors.budget?.message}>
              <select className={input} {...register('budget', { required: 'Budget is required' })}>
                <option value="">Select Budget</option>
                {budgetOptions.map((budget) => <option key={budget}>{budget}</option>)}
              </select>
            </Field>
            <Field label="Property Type" error={errors.propertyType?.message}>
              <select className={input} {...register('propertyType', { required: 'Property type is required' })}>
                <option value="">Select Property Type</option>
                {propertyTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </Field>
            <Field label="Preferred Visit Date" error={errors.preferredDate?.message}>
              <input className={input} type="date" min={new Date().toISOString().slice(0, 10)} {...register('preferredDate', { required: 'Preferred visit date is required' })} />
            </Field>
            <Field label="Additional Requirements" span><textarea className={`${input} min-h-28`} {...register('remarks')} /></Field>
          </div>

          <button disabled={isSubmitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-all hover:bg-white disabled:opacity-60" type="submit">
            <FaHome aria-hidden="true" />
            {isSubmitting ? 'Submitting...' : 'Book Site Visit'}
          </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}

function Field({ label, error, children, span }) {
  return (
    <label className={`grid gap-2 text-sm font-bold text-white/80 ${span ? 'md:col-span-2' : ''}`}>
      {label}
      {children}
      {error && <span className="text-xs font-semibold text-red-300">{error}</span>}
    </label>
  );
}
