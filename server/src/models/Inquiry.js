import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, maxlength: 1200 },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', index: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'site_visit_scheduled', 'negotiation', 'booked', 'registered', 'closed', 'lost'],
      default: 'new',
      index: true,
    },
    leadSource: {
      type: String,
      enum: ['website', 'whatsapp', 'phone', 'google_ads', 'meta_ads', 'facebook', 'instagram', 'referral', 'walk_in', 'other'],
      default: 'website',
      index: true,
    },
    budget: { type: String, trim: true },
    preferredLocation: { type: String, trim: true, index: true },
    assignedAgent: { type: String, trim: true, maxlength: 80 },
    followUpDate: { type: Date, index: true },
    notes: { type: String, trim: true, maxlength: 1200 },
  },
  { timestamps: true },
);

inquirySchema.index({
  name: 'text',
  phone: 'text',
  email: 'text',
  message: 'text',
  budget: 'text',
  preferredLocation: 'text',
  assignedAgent: 'text',
  notes: 'text',
});

export default mongoose.model('Inquiry', inquirySchema);
