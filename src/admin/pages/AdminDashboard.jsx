import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FaBlog, FaCalendarCheck, FaComments, FaHome, FaQuoteRight, FaStar } from 'react-icons/fa';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import adminApi from '../../api/adminApi';
import AdminCard from '../components/AdminCard';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

const gold = '#D4AF37';
const mutedGold = '#8F7629';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .get('/dashboard/analytics')
      .then(({ data }) => setAnalytics(data.data || {}))
      .catch(() => setAnalytics({}))
      .finally(() => setLoading(false));
  }, []);

  const typeData = useMemo(() => analytics?.propertyDistributionByType || [], [analytics]);
  const cityData = useMemo(() => analytics?.propertyDistributionByCity || [], [analytics]);

  if (loading) return <DashboardSkeleton />;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader title="Dashboard" subtitle="Monitor inventory, leads, testimonials, blogs, and market distribution." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AdminCard title="Total Properties" value={analytics?.totalProperties || 0} icon={FaHome} />
        <AdminCard title="Featured Properties" value={analytics?.featuredProperties || 0} icon={FaStar} tone="gold" />
        <AdminCard title="Total Inquiries" value={analytics?.totalInquiries || 0} icon={FaComments} />
        <AdminCard title="New Inquiries" value={analytics?.recentInquiries?.length || 0} icon={FaComments} tone="gold" />
        <AdminCard title="Total Site Visits" value={analytics?.totalSiteVisits || 0} icon={FaCalendarCheck} />
        <AdminCard title="Pending Site Visits" value={analytics?.pendingSiteVisits || 0} icon={FaCalendarCheck} tone="gold" />
        <AdminCard title="Completed Site Visits" value={analytics?.completedSiteVisits || 0} icon={FaCalendarCheck} />
        <AdminCard title="Testimonials" value={analytics?.testimonialsCount || 0} icon={FaQuoteRight} />
        <AdminCard title="Blogs" value={analytics?.blogsCount || 0} icon={FaBlog} tone="gold" />
      </div>

      <div className="mt-7 grid gap-7 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Properties by City">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={cityData}>
              <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
              <XAxis dataKey="label" stroke="rgba(255,255,255,.55)" />
              <YAxis allowDecimals={false} stroke="rgba(255,255,255,.55)" />
              <Tooltip contentStyle={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,.35)', color: '#fff' }} />
              <Bar dataKey="count" fill={gold} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Property Type Mix">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={typeData} dataKey="count" nameKey="label" outerRadius={110} label>
                {typeData.map((entry, index) => (
                  <Cell key={entry.label} fill={index % 2 ? mutedGold : gold} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,.35)', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="mt-7 grid gap-7 xl:grid-cols-2">
        <RecentTable title="Recent Inquiries" rows={analytics?.recentInquiries || []} />
        <RecentTable title="Recent Site Visits" rows={analytics?.recentSiteVisits || []} />
      </div>
    </motion.div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 shadow-[0_20px_60px_rgba(0,0,0,.25)]">
      <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
      <div className="mt-6 h-80">{children}</div>
    </section>
  );
}

function RecentTable({ title, rows }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 shadow-[0_20px_60px_rgba(0,0,0,.25)]">
      <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.14em] text-white/45">
            <tr><th className="p-3">Name</th><th className="p-3">Property</th><th className="p-3">Status</th></tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item._id} className="border-t border-white/10">
                <td className="p-3 font-bold text-white">{item.name}</td>
                <td className="p-3 text-white/60">{item.property?.title || 'General'}</td>
                <td className="p-3"><StatusBadge value={item.status} /></td>
              </tr>
            ))}
            {!rows.length && <tr><td className="p-3 text-white/50" colSpan="3">No recent activity.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DashboardSkeleton() {
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Loading analytics..." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-2xl bg-[#1A1A1A]" />
        ))}
      </div>
    </div>
  );
}
