import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, maxlength: 1200 },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', index: true },
    status: { type: String, enum: ['pending', 'contacted', 'closed'], default: 'pending', index: true },
    notes: { type: String, trim: true, maxlength: 1200 },
  },
  { timestamps: true },
);

inquirySchema.index({ name: 'text', phone: 'text', email: 'text', message: 'text', notes: 'text' });

export default mongoose.model('Inquiry', inquirySchema);
