import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import inquiryService from '../services/inquiryService';
import { trackEvent } from '../utils/tracking';

const input =
  'min-h-12 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15';

export default function ContactInquiryForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const submit = async (values) => {
    try {
      await inquiryService.createInquiry({ ...values, leadSource: 'website' });
      trackEvent('inquiry_submit', { source: 'contact_page' });
      toast.success('Inquiry submitted successfully');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to submit inquiry');
    }
  };

  return (
    <motion.section
      className="bg-ivory py-12 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-p4">
        <form onSubmit={handleSubmit(submit)} className="grid gap-5 rounded-2xl border border-ink/10 bg-white p-5 shadow-soft sm:p-7 md:grid-cols-2">
          <Field label="Name" error={errors.name?.message}>
            <input className={input} {...register('name', { required: 'Name is required' })} />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input className={input} {...register('phone', { required: 'Phone is required' })} />
          </Field>
          <Field label="Email">
            <input className={input} type="email" {...register('email')} />
          </Field>
          <Field label="Message" error={errors.message?.message} span>
            <textarea className={`${input} min-h-32`} {...register('message', { required: 'Message is required' })} />
          </Field>
          <button disabled={isSubmitting} className="min-h-12 rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night transition-colors hover:bg-night hover:text-white disabled:opacity-60 md:col-span-2" type="submit">
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </motion.section>
  );
}

function Field({ label, error, children, span }) {
  return (
    <label className={`grid gap-2 text-sm font-bold text-ink ${span ? 'md:col-span-2' : ''}`}>
      {label}
      {children}
      {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}
