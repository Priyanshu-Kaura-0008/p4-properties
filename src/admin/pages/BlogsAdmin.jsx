import { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminApi from '../../api/adminApi';
import AdminTable from '../components/AdminTable';
import ConfirmModal from '../components/ConfirmModal';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => adminApi.get('/blogs', { params: { limit: 50 } }).then(({ data }) => setBlogs(data.data || []));
  useEffect(() => { load(); }, []);

  const remove = async () => {
    await adminApi.delete(`/blogs/${deleteId}`);
    toast.success('Blog deleted');
    setDeleteId(null);
    load();
  };

  const columns = [
    { key: 'title', label: 'Title', render: (b) => <span className="font-bold text-white">{b.title}</span> },
    { key: 'category', label: 'Category' },
    { key: 'published', label: 'Status', render: (b) => <StatusBadge value={b.published ? 'Published' : 'Draft'} /> },
    { key: 'createdAt', label: 'Date', render: (b) => new Date(b.createdAt).toLocaleDateString() },
    { key: 'actions', label: 'Actions', render: (b) => (
      <div className="flex gap-2">
        <Link to={`/admin/blogs/edit/${b._id}`} className="rounded-lg p-2 text-gold hover:bg-white/10" aria-label="Edit blog"><FaEdit /></Link>
        <button onClick={() => setDeleteId(b._id)} className="rounded-lg p-2 text-red-300 hover:bg-white/10" aria-label="Delete blog"><FaTrash /></button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader
        title="Blog Management"
        subtitle="Create, publish, and maintain property insights."
        action={<Link to="/admin/blogs/add" className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-bold text-night hover:bg-white"><FaPlus /> Create Blog</Link>}
      />
      <AdminTable columns={columns} rows={blogs} />
      <ConfirmModal open={Boolean(deleteId)} title="Delete blog?" message="This blog post and its Cloudinary image will be removed." confirmLabel="Delete" onConfirm={remove} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
