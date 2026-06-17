import { useEffect, useState } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import adminApi from '../../api/adminApi';
import AdminTable from '../components/AdminTable';
import ConfirmModal from '../components/ConfirmModal';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

export default function InquiriesAdmin() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const load = () => adminApi.get('/inquiries', { params: { status, limit: 50 } }).then(({ data }) => setItems(data.data || []));
  useEffect(() => { load(); }, [status]);

  const updateStatus = async (id, nextStatus) => {
    await adminApi.put(`/inquiries/${id}`, { status: nextStatus });
    toast.success('Inquiry updated');
    load();
  };

  const remove = async () => {
    await adminApi.delete(`/inquiries/${deleteId}`);
    toast.success('Inquiry deleted');
    setDeleteId(null);
    load();
  };

  const columns = [
    { key: 'name', label: 'Name', render: (i) => <span className="font-bold text-white">{i.name}</span> },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'property', label: 'Property', render: (i) => i.property?.title || 'General' },
    { key: 'message', label: 'Message', render: (i) => <span className="block max-w-xs truncate">{i.message}</span> },
    { key: 'status', label: 'Status', render: (i) => <StatusBadge value={i.status} /> },
    { key: 'date', label: 'Date', render: (i) => new Date(i.createdAt).toLocaleDateString() },
    { key: 'actions', label: 'Actions', render: (i) => (
      <div className="flex gap-2">
        <button className="rounded-lg p-2 text-emerald-300 hover:bg-white/10" onClick={() => updateStatus(i._id, 'closed')} aria-label="Close inquiry"><FaCheck /></button>
        <button className="rounded-lg p-2 text-red-300 hover:bg-white/10" onClick={() => setDeleteId(i._id)} aria-label="Delete inquiry"><FaTrash /></button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader title="Inquiries" subtitle="Manage buyer, seller, and investor conversations." />
      <div className="mb-5">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white outline-none focus:border-gold">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <AdminTable columns={columns} rows={items} />
      <ConfirmModal open={Boolean(deleteId)} title="Delete inquiry?" message="This inquiry will be permanently removed." confirmLabel="Delete" onConfirm={remove} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
