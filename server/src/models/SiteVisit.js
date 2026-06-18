import mongoose from 'mongoose';

const siteVisitSchema = new mongoose.Schema(
  {
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', index: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true },
    address: { type: String, trim: true, maxlength: 300 },
    preferredLocation: { type: String, trim: true, index: true },
    budget: { type: String, trim: true },
    propertyType: { type: String, trim: true, index: true },
    preferredDate: { type: Date, required: true, index: true },
    preferredTime: { type: String, default: 'Flexible', trim: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending', index: true },
    leadSource: {
      type: String,
      enum: ['website', 'whatsapp', 'phone', 'google_ads', 'meta_ads', 'facebook', 'instagram', 'referral', 'walk_in', 'other'],
      default: 'website',
      index: true,
    },
    assignedAgent: { type: String, trim: true, maxlength: 80 },
    followUpDate: { type: Date, index: true },
    remarks: { type: String, trim: true, maxlength: 1200 },
  },
  { timestamps: true },
);

siteVisitSchema.index({
  name: 'text',
  phone: 'text',
  email: 'text',
  address: 'text',
  preferredLocation: 'text',
  budget: 'text',
  propertyType: 'text',
  remarks: 'text',
});

export default mongoose.model('SiteVisit', siteVisitSchema);
