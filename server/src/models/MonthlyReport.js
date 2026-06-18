import mongoose from 'mongoose';

const monthlyReportSchema = new mongoose.Schema(
  {
    month: { type: String, required: true, unique: true, trim: true, index: true },
    leads: { type: Number, default: 0 },
    siteVisits: { type: Number, default: 0 },
    closings: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    costPerLead: { type: Number, default: 0 },
    sourceBreakdown: [{ label: String, count: Number }],
    agentPerformance: [{ agent: String, leads: Number, siteVisits: Number, closings: Number }],
    notes: { type: String, trim: true, maxlength: 3000 },
  },
  { timestamps: true },
);

export default mongoose.model('MonthlyReport', monthlyReportSchema);
