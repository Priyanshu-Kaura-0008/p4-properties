import Inquiry from '../models/Inquiry.js';
import MonthlyReport from '../models/MonthlyReport.js';
import SiteVisit from '../models/SiteVisit.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendMonthlyReportEmail } from '../services/notificationService.js';

const monthRange = (month) => {
  const [year, monthIndex] = month.split('-').map(Number);
  const start = new Date(Date.UTC(year, monthIndex - 1, 1));
  const end = new Date(Date.UTC(year, monthIndex, 1));
  return { start, end };
};

const sourcePipeline = (start, end) => [
  { $match: { createdAt: { $gte: start, $lt: end } } },
  { $group: { _id: '$leadSource', count: { $sum: 1 } } },
  { $project: { _id: 0, label: { $ifNull: ['$_id', 'Unknown'] }, count: 1 } },
  { $sort: { count: -1 } },
];

const agentPipeline = (start, end) => [
  { $match: { createdAt: { $gte: start, $lt: end } } },
  { $group: { _id: '$assignedAgent', leads: { $sum: 1 } } },
  { $project: { _id: 0, agent: { $ifNull: ['$_id', 'Unassigned'] }, leads: 1, siteVisits: { $literal: 0 }, closings: { $literal: 0 } } },
  { $sort: { leads: -1 } },
];

export const generateMonthlyReport = asyncHandler(async (req, res) => {
  const month = req.body.month || new Date().toISOString().slice(0, 7);
  const { start, end } = monthRange(month);

  const [leads, siteVisits, closings, sourceBreakdown, agentPerformance] = await Promise.all([
    Inquiry.countDocuments({ createdAt: { $gte: start, $lt: end } }),
    SiteVisit.countDocuments({ createdAt: { $gte: start, $lt: end } }),
    Inquiry.countDocuments({ status: { $in: ['booked', 'registered', 'closed'] }, updatedAt: { $gte: start, $lt: end } }),
    Inquiry.aggregate(sourcePipeline(start, end)),
    Inquiry.aggregate(agentPipeline(start, end)),
  ]);

  const revenue = Number(req.body.revenue || 0);
  const cost = Number(req.body.cost || 0);
  const report = await MonthlyReport.findOneAndUpdate(
    { month },
    {
      month,
      leads,
      siteVisits,
      closings,
      revenue,
      cost,
      conversionRate: leads ? Number(((siteVisits / leads) * 100).toFixed(1)) : 0,
      costPerLead: leads ? Number((cost / leads).toFixed(2)) : 0,
      sourceBreakdown,
      agentPerformance,
      notes: req.body.notes,
    },
    { upsert: true, returnDocument: 'after', runValidators: true },
  );

  if (req.body.emailTo) sendMonthlyReportEmail({ to: req.body.emailTo, report }).catch(() => null);

  res.status(200).json({ success: true, data: report });
});

export const getMonthlyReports = asyncHandler(async (req, res) => {
  const reports = await MonthlyReport.find().sort('-month').limit(Math.min(Number(req.query.limit) || 12, 36));
  res.status(200).json({ success: true, count: reports.length, data: reports });
});
