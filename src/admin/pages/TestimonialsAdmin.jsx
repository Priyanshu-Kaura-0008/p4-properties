import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminApi from '../../api/adminApi';
import ConfirmModal from '../components/ConfirmModal';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

const input = 'w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold';

export default function TestimonialsAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: { rating: 5 } });

  const load = () => adminApi.get('/testimonials/admin').then(({ data }) => setItems(data.data || []));
  useEffect(() => { load(); }, []);

  const submit = async (values) => {
    const formData = new FormData();
    formData.append('featured', values.featured ? 'true' : 'false');
    formData.append('approved', values.approved ? 'true' : 'false');
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'image' && key !== 'featured' && key !== 'approved') formData.append(key, value);
    });
    if (values.image?.[0]) formData.append('image', values.image[0]);
    if (editing) await adminApi.put(`/testimonials/${editing._id}`, formData);
    else await adminApi.post('/testimonials', formData);
    toast.success(editing ? 'Testimonial updated' : 'Testimonial created');
    setEditing(null);
    reset({ rating: 5 });
    load();
  };

  const approve = async (id) => { await adminApi.patch(`/testimonials/${id}/approve`); toast.success('Testimonial approved'); load(); };
  const reject = async (item) => { await adminApi.put(`/testimonials/${item._id}`, { ...item, approved: false }); toast.success('Testimonial rejected'); load(); };
  const remove = async () => { await adminApi.delete(`/testimonials/${deleteId}`); toast.success('Testimonial deleted'); setDeleteId(null); load(); };

  const edit = (item) => {
    setEditing(item);
    reset({ ...item, featured: item.featured, approved: item.approved });
  };

  return (
    <div>
      <PageHeader title="Testimonials" subtitle="Approve, reject, and curate client reviews." />
      <form onSubmit={handleSubmit(submit)} className="mb-7 grid gap-4 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 shadow-premium md:grid-cols-2">
        <input className={input} placeholder="Client Name" {...register('name', { required: true })} />
        <input className={input} placeholder="Location" {...register('location', { required: true })} />
        <input className={input} type="number" min="1" max="5" placeholder="Rating" {...register('rating', { required: true })} />
        <input className={input} type="file" accept="image/*" {...register('image')} />
        <textarea className={`${input} md:col-span-2`} rows="4" placeholder="Review" {...register('review', { required: true })} />
        <label className="flex items-center gap-3 font-bold text-white"><input type="checkbox" className="h-5 w-5 accent-gold" {...register('featured')} /> Featured</label>
        <label className="flex items-center gap-3 font-bold text-white"><input type="checkbox" className="h-5 w-5 accent-gold" {...register('approved')} /> Approved</label>
        <button className="rounded-xl bg-gold px-6 py-3 text-sm font-bold text-night hover:bg-white md:col-span-2">{editing ? 'Update Testimonial' : 'Add Testimonial'}</button>
      </form>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item._id} className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div><h3 className="font-display text-2xl font-bold text-white">{item.name}</h3><p className="mt-1 text-sm font-semibold text-white/50">{item.location} | {item.rating} Stars</p></div>
              <StatusBadge value={item.approved ? 'Approved' : 'Pending'} />
            </div>
            <p className="mt-4 leading-7 text-white/60">{item.review}</p>
            <div className="mt-5 flex gap-2 text-lg">
              <button onClick={() => approve(item._id)} className="p-2 text-emerald-300" aria-label="Approve"><FaCheck /></button>
              <button onClick={() => reject(item)} className="p-2 text-red-300" aria-label="Reject"><FaTimes /></button>
              <button onClick={() => edit(item)} className="p-2 text-gold" aria-label="Edit"><FaEdit /></button>
              <button onClick={() => setDeleteId(item._id)} className="p-2 text-red-300" aria-label="Delete"><FaTrash /></button>
            </div>
          </article>
        ))}
      </div>
      <ConfirmModal open={Boolean(deleteId)} title="Delete testimonial?" message="This review will be permanently removed." confirmLabel="Delete" onConfirm={remove} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
