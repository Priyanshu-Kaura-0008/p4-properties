import mongoose from 'mongoose';

const documentFileSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    format: { type: String, trim: true },
    bytes: { type: Number, min: 0 },
  },
  { _id: false },
);

const propertyDocumentSchema = new mongoose.Schema(
  {
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    type: {
      type: String,
      enum: ['CLU', 'RERA', 'Approval', 'Floor Plan', 'Brochure', 'Registry', 'NOC', 'Other'],
      required: true,
      index: true,
    },
    file: documentFileSchema,
    secure: { type: Boolean, default: true, index: true },
    notes: { type: String, trim: true, maxlength: 1200 },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default mongoose.model('PropertyDocument', propertyDocumentSchema);
