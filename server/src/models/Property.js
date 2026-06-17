import mongoose from 'mongoose';
import slugify from 'slugify';

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false },
);

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, unique: true, lowercase: true, index: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0, index: true },
    propertyType: { type: String, required: true, trim: true, index: true },
    purpose: { type: String, required: true, enum: ['Buy', 'Sale', 'Sell', 'Rent'], index: true },
    category: { type: String, enum: ['Residential', 'Commercial'], index: true },
    city: { type: String, required: true, trim: true, index: true },
    locality: { type: String, required: true, trim: true, index: true },
    address: { type: String, required: true, trim: true },
    landArea: { type: Number, required: true, min: 0, index: true },
    areaUnit: { type: String, required: true, trim: true },
    bedrooms: { type: Number, default: 0, min: 0 },
    bathrooms: { type: Number, default: 0, min: 0 },
    parking: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Rented', 'Draft'],
      default: 'Available',
      index: true,
    },
    amenities: [{ type: String, trim: true }],
    images: [imageSchema],
    views: { type: Number, default: 0, min: 0, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

propertySchema.index({
  title: 'text',
  description: 'text',
  propertyType: 'text',
  category: 'text',
  city: 'text',
  locality: 'text',
  address: 'text',
  amenities: 'text',
});

propertySchema.pre('validate', function createSlug(next) {
  if (this.isModified('title') || !this.slug) {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    const suffix = this._id ? `-${this._id.toString().slice(-6)}` : '';
    this.slug = `${baseSlug}${suffix}`;
  }

  next();
});

export default mongoose.model('Property', propertySchema);
