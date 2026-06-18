import { useEffect, useState } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import siteVisitService from '../../services/siteVisitService';
import AdminTable from '../components/AdminTable';
import ConfirmModal from '../components/ConfirmModal';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

const leadSources = ['website', 'whatsapp', 'phone', 'google_ads', 'meta_ads', 'facebook', 'instagram', 'referral', 'walk_in', 'other'];

export default function SiteVisitsAdmin() {
  const [items, setItems] = useState([]);
  const [leadSource, setLeadSource] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const load = () => siteVisitService.getSiteVisits({ leadSource, limit: 50 }).then((data) => setItems(data.data || []));
  useEffect(() => { load(); }, [leadSource]);

  const confirmVisit = async (id) => {
    await siteVisitService.updateSiteVisit(id, { status: 'confirmed' });
    toast.success('Site visit confirmed');
    load();
  };

  const remove = async () => {
    await siteVisitService.deleteSiteVisit(deleteId);
    toast.success('Site visit deleted');
    setDeleteId(null);
    load();
  };

  const columns = [
    { key: 'name', label: 'Visitor', render: (i) => <span className="font-bold text-white">{i.name}</span> },
    { key: 'phone', label: 'Phone' },
    { key: 'preferredLocation', label: 'Location', render: (i) => i.preferredLocation || '-' },
    { key: 'budget', label: 'Budget', render: (i) => i.budget || '-' },
    { key: 'propertyType', label: 'Type', render: (i) => i.propertyType || '-' },
    { key: 'leadSource', label: 'Source', render: (i) => <span className="capitalize">{String(i.leadSource || 'website').replace(/_/g, ' ')}</span> },
    { key: 'property', label: 'Property', render: (i) => i.property?.title || 'General' },
    { key: 'address', label: 'Address', render: (i) => i.address || '-' },
    { key: 'date', label: 'Visit Date', render: (i) => `${new Date(i.preferredDate).toLocaleDateString()} ${i.preferredTime || ''}` },
    { key: 'status', label: 'Status', render: (i) => <StatusBadge value={i.status} /> },
    { key: 'actions', label: 'Actions', render: (i) => (
      <div className="flex gap-2">
        <button className="rounded-lg p-2 text-emerald-300 hover:bg-white/10" onClick={() => confirmVisit(i._id)} aria-label="Confirm visit"><FaCheck /></button>
        <button className="rounded-lg p-2 text-red-300 hover:bg-white/10" onClick={() => setDeleteId(i._id)} aria-label="Delete visit"><FaTrash /></button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader title="Site Visits" subtitle="Track private property visit requests." />
      <div className="mb-5">
        <select value={leadSource} onChange={(e) => setLeadSource(e.target.value)} className="rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white outline-none focus:border-gold">
          <option value="">All Sources</option>
          {leadSources.map((option) => <option key={option} value={option}>{option.replace(/_/g, ' ')}</option>)}
        </select>
      </div>
      <AdminTable columns={columns} rows={items} />
      <ConfirmModal open={Boolean(deleteId)} title="Delete site visit?" message="This booking will be permanently removed." confirmLabel="Delete" onConfirm={remove} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
