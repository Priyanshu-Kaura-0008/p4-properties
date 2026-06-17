import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    officeAddress: { type: String, trim: true },
    whatsapp: { type: String, trim: true },
    socialLinks: {
      instagram: { type: String, trim: true },
      facebook: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      youtube: { type: String, trim: true },
    },
  },
  { timestamps: true },
);

export default mongoose.model('Setting', settingSchema);
