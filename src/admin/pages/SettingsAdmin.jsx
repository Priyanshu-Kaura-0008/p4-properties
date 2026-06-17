import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import adminApi from '../../api/adminApi';
import PageHeader from '../components/PageHeader';

const input = 'w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold';

export default function SettingsAdmin() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    adminApi.get('/settings').then(({ data }) => {
      const settings = data.data || {};
      reset({
        phone: settings.phone,
        email: settings.email,
        officeAddress: settings.officeAddress,
        whatsapp: settings.whatsapp,
        instagram: settings.socialLinks?.instagram,
        facebook: settings.socialLinks?.facebook,
        linkedin: settings.socialLinks?.linkedin,
        youtube: settings.socialLinks?.youtube,
      });
    }).catch(() => {});
  }, [reset]);

  const submit = async (values) => {
    await adminApi.put('/settings', {
      phone: values.phone,
      email: values.email,
      officeAddress: values.officeAddress,
      whatsapp: values.whatsapp,
      socialLinks: {
        instagram: values.instagram,
        facebook: values.facebook,
        linkedin: values.linkedin,
        youtube: values.youtube,
      },
    });
    toast.success('Settings saved');
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Update company, contact, WhatsApp, and social media details." />
      <form onSubmit={handleSubmit(submit)} className="grid gap-5 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 shadow-premium md:grid-cols-2">
        <Field label="Phone Number"><input className={input} {...register('phone')} /></Field>
        <Field label="Email"><input className={input} type="email" {...register('email')} /></Field>
        <Field label="WhatsApp Number"><input className={input} {...register('whatsapp')} /></Field>
        <Field label="Instagram"><input className={input} {...register('instagram')} /></Field>
        <Field label="Facebook"><input className={input} {...register('facebook')} /></Field>
        <Field label="LinkedIn"><input className={input} {...register('linkedin')} /></Field>
        <Field label="YouTube"><input className={input} {...register('youtube')} /></Field>
        <Field label="Office Address" span><textarea className={input} rows="4" {...register('officeAddress')} /></Field>
        <button disabled={isSubmitting} className="rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night hover:bg-white disabled:opacity-60 md:col-span-2">
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children, span }) {
  return <label className={`grid gap-2 text-sm font-bold text-white/80 ${span ? 'md:col-span-2' : ''}`}>{label}{children}</label>;
}
