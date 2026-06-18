import { useEffect, useState } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import inquiryService from '../../services/inquiryService';
import AdminTable from '../components/AdminTable';
import ConfirmModal from '../components/ConfirmModal';
import PageHeader from '../components/PageHeader';

const pipelineStatuses = [
  'new',
  'contacted',
  'site_visit_scheduled',
  'negotiation',
  'booked',
  'registered',
  'closed',
  'lost',
];
const leadSources = ['website', 'whatsapp', 'phone', 'google_ads', 'meta_ads', 'facebook', 'instagram', 'referral', 'walk_in', 'other'];

export default function InquiriesAdmin() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const load = () => inquiryService.getInquiries({ status, leadSource, limit: 50 }).then((data) => setItems(data.data || []));
  useEffect(() => { load(); }, [status, leadSource]);

  const updateStatus = async (id, nextStatus) => {
    await inquiryService.updateInquiry(id, { status: nextStatus });
    toast.success('Inquiry updated');
    load();
  };

  const remove = async () => {
    await inquiryService.deleteInquiry(deleteId);
    toast.success('Inquiry deleted');
    setDeleteId(null);
    load();
  };

  const columns = [
    { key: 'name', label: 'Name', render: (i) => <span className="font-bold text-white">{i.name}</span> },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'property', label: 'Property', render: (i) => i.property?.title || 'General' },
    { key: 'leadSource', label: 'Source', render: (i) => <span className="capitalize">{String(i.leadSource || 'website').replace(/_/g, ' ')}</span> },
    { key: 'preferredLocation', label: 'Location', render: (i) => i.preferredLocation || i.property?.city || '-' },
    { key: 'budget', label: 'Budget', render: (i) => i.budget || '-' },
    { key: 'message', label: 'Message', render: (i) => <span className="block max-w-xs truncate">{i.message}</span> },
    { key: 'status', label: 'Stage', render: (i) => (
      <select
        value={i.status}
        onChange={(event) => updateStatus(i._id, event.target.value)}
        className="rounded-lg border border-white/10 bg-night px-3 py-2 text-xs font-bold capitalize text-white outline-none focus:border-gold"
      >
        {pipelineStatuses.map((option) => <option key={option} value={option}>{option.replace(/_/g, ' ')}</option>)}
      </select>
    ) },
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
      <div className="mb-5 flex flex-wrap gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white outline-none focus:border-gold">
          <option value="">All Stages</option>
          {pipelineStatuses.map((option) => <option key={option} value={option}>{option.replace(/_/g, ' ')}</option>)}
        </select>
        <select value={leadSource} onChange={(e) => setLeadSource(e.target.value)} className="rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white outline-none focus:border-gold">
          <option value="">All Sources</option>
          {leadSources.map((option) => <option key={option} value={option}>{option.replace(/_/g, ' ')}</option>)}
        </select>
      </div>
      <AdminTable columns={columns} rows={items} />
      <ConfirmModal open={Boolean(deleteId)} title="Delete inquiry?" message="This inquiry will be permanently removed." confirmLabel="Delete" onConfirm={remove} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
