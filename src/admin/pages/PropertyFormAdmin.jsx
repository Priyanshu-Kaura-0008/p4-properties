import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import adminApi from '../../api/adminApi';
import PageHeader from '../components/PageHeader';

const input = 'w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold';

export default function PropertyFormAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { purpose: 'Buy', category: 'Residential', status: 'Available', areaUnit: 'Sq.ft.' },
  });

  useEffect(() => {
    if (id) {
      adminApi.get(`/properties/id/${id}`).then(({ data }) => {
        const property = data.data;
        reset({ ...property, amenities: property.amenities?.join(', ') });
      });
    }
  }, [id, reset]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    values.featured = values.featured ? 'true' : 'false';
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'images' && key !== 'floorPlans' && value !== undefined) formData.append(key, value);
    });
    Array.from(values.images || []).forEach((file) => formData.append('images', file));
    Array.from(values.floorPlans || []).forEach((file) => formData.append('images', file));

    if (id) await adminApi.put(`/properties/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    else await adminApi.post('/properties', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    toast.success(id ? 'Property updated' : 'Property created');
    navigate('/admin/properties');
  };

  return (
    <div>
      <PageHeader title={id ? 'Edit Property' : 'Add Property'} subtitle="Create refined listings with Cloudinary image uploads." />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 shadow-premium md:grid-cols-2">
        <Field label="Title"><input className={input} {...register('title', { required: true })} /></Field>
        <Field label="Price"><input className={input} type="number" {...register('price', { required: true })} /></Field>
        <Field label="City"><input className={input} {...register('city', { required: true })} /></Field>
        <Field label="Locality"><input className={input} {...register('locality', { required: true })} /></Field>
        <Field label="Address" span><input className={input} {...register('address', { required: true })} /></Field>
        <Field label="Purpose"><select className={input} {...register('purpose')}><option>Buy</option><option>Sale</option><option>Sell</option><option>Rent</option></select></Field>
        <Field label="Category"><select className={input} {...register('category')}><option>Residential</option><option>Commercial</option></select></Field>
        <Field label="Property Type"><input className={input} {...register('propertyType', { required: true })} /></Field>
        <Field label="Status"><select className={input} {...register('status')}><option>Available</option><option>Sold</option><option>Rented</option><option>Draft</option></select></Field>
        <Field label="Bedrooms"><input className={input} type="number" {...register('bedrooms')} /></Field>
        <Field label="Bathrooms"><input className={input} type="number" {...register('bathrooms')} /></Field>
        <Field label="Parking"><input className={input} type="number" {...register('parking')} /></Field>
        <Field label="Land Area"><input className={input} type="number" {...register('landArea', { required: true })} /></Field>
        <Field label="Area Unit"><input className={input} {...register('areaUnit', { required: true })} /></Field>
        <Field label="Gallery Images"><input className={input} type="file" multiple accept="image/*" {...register('images')} /></Field>
        <Field label="Floor Plans"><input className={input} type="file" multiple accept="image/*,.pdf" {...register('floorPlans')} /></Field>
        <Field label="Amenities" span><textarea className={input} rows="3" placeholder="Comma separated" {...register('amenities')} /></Field>
        <Field label="Description" span><textarea className={input} rows="6" {...register('description', { required: true })} /></Field>
        <label className="flex items-center gap-3 font-bold text-white md:col-span-2">
          <input type="checkbox" className="h-5 w-5 accent-gold" {...register('featured')} />
          Featured Property
        </label>
        <button disabled={isSubmitting} className="rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night hover:bg-white disabled:opacity-60 md:col-span-2">
          {isSubmitting ? 'Saving...' : 'Submit Property'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children, span }) {
  return <label className={`grid gap-2 text-sm font-bold text-white/80 ${span ? 'md:col-span-2' : ''}`}>{label}{children}</label>;
}
