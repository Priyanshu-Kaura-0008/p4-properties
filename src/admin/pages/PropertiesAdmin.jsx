import { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminApi from '../../api/adminApi';
import AdminTable from '../components/AdminTable';
import ConfirmModal from '../components/ConfirmModal';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

const input = 'rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-gold';

export default function PropertiesAdmin() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);

  const loadProperties = () => {
    setLoading(true);
    adminApi
      .get('/properties', { params: { search, status, page, limit: 10 } })
      .then(({ data }) => {
        setProperties(data.data || []);
        setPages(data.pages || data.meta?.pages || 1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProperties(); }, [page, status]);

  const deleteProperty = async () => {
    await adminApi.delete(`/properties/${confirmId}`);
    toast.success('Property deleted');
    setConfirmId(null);
    loadProperties();
  };

  const columns = [
    { key: 'image', label: 'Image', render: (p) => <img src={p.images?.[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=70'} alt={p.title} className="h-14 w-20 rounded-lg object-cover" /> },
    { key: 'title', label: 'Title', render: (p) => <span className="font-bold text-white">{p.title}</span> },
    { key: 'price', label: 'Price', render: (p) => `Rs. ${Number(p.price).toLocaleString('en-IN')}` },
    { key: 'city', label: 'Location', render: (p) => [p.locality, p.city].filter(Boolean).join(', ') },
    { key: 'status', label: 'Status', render: (p) => <StatusBadge value={p.status} /> },
    { key: 'featured', label: 'Featured', render: (p) => p.featured ? 'Yes' : 'No' },
    { key: 'actions', label: 'Actions', render: (p) => (
      <div className="flex gap-2">
        <Link to={`/admin/properties/edit/${p._id}`} className="rounded-lg p-2 text-gold hover:bg-white/10" aria-label="Edit property"><FaEdit /></Link>
        <button onClick={() => setConfirmId(p._id)} className="rounded-lg p-2 text-red-300 hover:bg-white/10" aria-label="Delete property"><FaTrash /></button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader
        title="Property Management"
        subtitle="Search, filter, publish, and maintain premium listings."
        action={<Link to="/admin/properties/add" className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-bold text-night hover:bg-white"><FaPlus /> Add Property</Link>}
      />
      <div className="mb-5 flex flex-col gap-3 md:flex-row">
        <div className="flex max-w-md flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3">
          <FaSearch className="text-white/40" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && loadProperties()} className="w-full bg-transparent text-white outline-none placeholder:text-white/35" placeholder="Search properties" />
        </div>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className={input}>
          <option value="">All Status</option>
          <option>Available</option>
          <option>Sold</option>
          <option>Rented</option>
          <option>Draft</option>
        </select>
        <button onClick={loadProperties} className="rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-gold hover:text-night">Apply</button>
      </div>
      {loading ? <div className="h-80 animate-pulse rounded-2xl bg-[#1A1A1A]" /> : <AdminTable columns={columns} rows={properties} />}
      <div className="mt-5 flex justify-end gap-2 text-white">
        <button disabled={page === 1} onClick={() => setPage((v) => v - 1)} className="rounded-xl border border-white/10 px-4 py-2 disabled:opacity-40">Previous</button>
        <span className="px-4 py-2 font-bold">Page {page} of {pages}</span>
        <button disabled={page === pages} onClick={() => setPage((v) => v + 1)} className="rounded-xl border border-white/10 px-4 py-2 disabled:opacity-40">Next</button>
      </div>
      <ConfirmModal open={Boolean(confirmId)} title="Delete property?" message="This will remove the listing and its Cloudinary images." confirmLabel="Delete" onConfirm={deleteProperty} onCancel={() => setConfirmId(null)} />
    </div>
  );
}
