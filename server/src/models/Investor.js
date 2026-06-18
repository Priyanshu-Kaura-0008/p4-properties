import mongoose from 'mongoose';

const investorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true },
    preferredLocation: { type: String, required: true, trim: true, index: true },
    budget: { type: String, required: true, trim: true },
    budgetMin: { type: Number, min: 0 },
    budgetMax: { type: Number, min: 0, index: true },
    propertyType: { type: String, required: true, trim: true, index: true },
    roiExpectation: { type: String, trim: true },
    source: {
      type: String,
      enum: ['website', 'whatsapp', 'phone', 'google_ads', 'meta_ads', 'facebook', 'instagram', 'referral', 'walk_in', 'other'],
      default: 'website',
      index: true,
    },
    status: { type: String, enum: ['active', 'contacted', 'matched', 'closed', 'inactive'], default: 'active', index: true },
    assignedAgent: { type: String, trim: true, maxlength: 80 },
    followUpDate: { type: Date, index: true },
    notes: { type: String, trim: true, maxlength: 1200 },
  },
  { timestamps: true },
);

investorSchema.index({
  name: 'text',
  phone: 'text',
  email: 'text',
  preferredLocation: 'text',
  budget: 'text',
  propertyType: 'text',
  roiExpectation: 'text',
  notes: 'text',
});

export default mongoose.model('Investor', investorSchema);
