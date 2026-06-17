import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import adminApi from '../../api/adminApi';
import PageHeader from '../components/PageHeader';

const input = 'w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold';

export default function BlogFormAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (id) {
      adminApi.get('/blogs', { params: { limit: 100 } }).then(({ data }) => {
        const blog = (data.data || []).find((item) => item._id === id);
        if (blog) reset({ ...blog, tags: blog.tags?.join(', ') });
      });
    }
  }, [id, reset]);

  const submit = async (values) => {
    const formData = new FormData();
    formData.append('published', values.published ? 'true' : 'false');
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'image' && key !== 'published' && value !== undefined) formData.append(key, value);
    });
    if (values.image?.[0]) formData.append('image', values.image[0]);
    if (id) await adminApi.put(`/blogs/${id}`, formData);
    else await adminApi.post('/blogs', formData);
    toast.success(id ? 'Blog updated' : 'Blog created');
    navigate('/admin/blogs');
  };

  return (
    <div>
      <PageHeader title={id ? 'Edit Blog' : 'Create Blog'} subtitle="Publish market insights and real estate guides." />
      <form onSubmit={handleSubmit(submit)} className="grid gap-5 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 shadow-premium md:grid-cols-2">
        <Field label="Title" span><input className={input} {...register('title', { required: true })} /></Field>
        <Field label="Excerpt" span><textarea className={input} rows="3" {...register('excerpt', { required: true })} /></Field>
        <Field label="Category"><input className={input} {...register('category')} /></Field>
        <Field label="Tags"><input className={input} placeholder="Comma separated" {...register('tags')} /></Field>
        <Field label="Cover Image" span><input className={input} type="file" accept="image/*" {...register('image')} /></Field>
        <Field label="Content" span><textarea className={input} rows="10" {...register('content', { required: true })} /></Field>
        <label className="flex items-center gap-3 font-bold text-white md:col-span-2">
          <input type="checkbox" className="h-5 w-5 accent-gold" {...register('published')} />
          Publish Blog
        </label>
        <button disabled={isSubmitting} className="rounded-xl bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-night hover:bg-white disabled:opacity-60 md:col-span-2">
          {isSubmitting ? 'Saving...' : 'Save Blog'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children, span }) {
  return <label className={`grid gap-2 text-sm font-bold text-white/80 ${span ? 'md:col-span-2' : ''}`}>{label}{children}</label>;
}
