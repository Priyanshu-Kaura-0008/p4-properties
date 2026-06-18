import mongoose from 'mongoose';

const propertyAlertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true },
    location: { type: String, required: true, trim: true, index: true },
    budgetMin: { type: Number, min: 0 },
    budgetMax: { type: Number, min: 0, index: true },
    propertyType: { type: String, required: true, trim: true, index: true },
    purpose: { type: String, enum: ['Buy', 'Rent', 'Sale', 'Sell'], default: 'Buy', index: true },
    active: { type: Boolean, default: true, index: true },
    lastMatchedAt: { type: Date },
    notes: { type: String, trim: true, maxlength: 1200 },
  },
  { timestamps: true },
);

propertyAlertSchema.index({ name: 'text', phone: 'text', email: 'text', location: 'text', propertyType: 'text', notes: 'text' });

export default mongoose.model('PropertyAlert', propertyAlertSchema);
