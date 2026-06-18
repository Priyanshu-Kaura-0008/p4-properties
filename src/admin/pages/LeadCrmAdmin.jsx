import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import inquiryService from '../../services/inquiryService';
import AdminTable from '../components/AdminTable';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

const stages = ['new', 'contacted', 'site_visit_scheduled', 'negotiation', 'booked', 'registered', 'lost'];

export default function LeadCrmAdmin() {
  const [leads, setLeads] = useState([]);
  const [stage, setStage] = useState('');

  const load = () => inquiryService.getInquiries({ status: stage, limit: 100 }).then((data) => setLeads(data.data || []));
  useEffect(() => { load(); }, [stage]);

  const updateLead = async (lead, updates) => {
    await inquiryService.updateInquiry(lead._id, updates);
    toast.success('Lead updated');
    load();
  };

  const stageCounts = useMemo(() => stages.map((item) => ({
    label: item,
    count: leads.filter((lead) => lead.status === item).length,
  })), [leads]);

  const columns = [
    { key: 'name', label: 'Lead', render: (lead) => <span className="font-bold text-white">{lead.name}</span> },
    { key: 'phone', label: 'Phone' },
    { key: 'source', label: 'Source', render: (lead) => <span className="capitalize">{String(lead.leadSource || 'website').replace(/_/g, ' ')}</span> },
    { key: 'location', label: 'Location', render: (lead) => lead.preferredLocation || lead.property?.city || '-' },
    { key: 'budget', label: 'Budget', render: (lead) => lead.budget || '-' },
    { key: 'owner', label: 'Owner', render: (lead) => lead.assignedAgent || 'P4 Sales Team' },
    { key: 'followUp', label: 'Follow-up', render: (lead) => lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : '-' },
    { key: 'status', label: 'Stage', render: (lead) => <StatusBadge value={String(lead.status).replace(/_/g, ' ')} /> },
    { key: 'actions', label: 'Move Stage', render: (lead) => (
      <select
        value={lead.status}
        onChange={(event) => updateLead(lead, { status: event.target.value })}
        className="rounded-lg border border-white/10 bg-night px-3 py-2 text-xs font-bold capitalize text-white outline-none focus:border-gold"
      >
        {stages.map((option) => <option key={option} value={option}>{option.replace(/_/g, ' ')}</option>)}
      </select>
    ) },
  ];

  return (
    <div>
      <PageHeader title="Lead CRM" subtitle="Track lead owners, sources, follow-up dates, and pipeline stages." />

      <div className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-7">
        {stageCounts.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setStage(stage === item.label ? '' : item.label)}
            className={`rounded-2xl border p-4 text-left transition ${stage === item.label ? 'border-gold bg-gold/10' : 'border-white/10 bg-[#1A1A1A]'}`}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/45">{item.label.replace(/_/g, ' ')}</p>
            <p className="mt-2 font-display text-3xl font-bold text-gold">{item.count}</p>
          </button>
        ))}
      </div>

      <AdminTable columns={columns} rows={leads} />
    </div>
  );
}
