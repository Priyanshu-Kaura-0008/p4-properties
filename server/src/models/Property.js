import mongoose from 'mongoose';
import slugify from 'slugify';

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
  },
  { _id: false },
);

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, unique: true, lowercase: true, index: true },
    description: { type: String, default: '', trim: true },
    price: { type: Number, required: true, min: 0, index: true },
    propertyType: { type: String, required: true, trim: true, index: true },
    purpose: { type: String, enum: ['Buy', 'Rent', 'Sale', 'Sell'], default: 'Buy', index: true },
    category: { type: String, enum: ['Residential', 'Commercial'], index: true },
    city: { type: String, trim: true, index: true },
    location: { type: String, required: true, trim: true, index: true },
    locality: { type: String, trim: true, index: true },
    address: { type: String, trim: true },
    area: { type: Number, min: 0, index: true },
    landArea: { type: Number, min: 0, index: true },
    areaUnit: { type: String, default: 'sq ft', trim: true },
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
    mainImage: imageSchema,
    galleryImages: [imageSchema],
    images: [imageSchema],
    googleMapLink: { type: String, trim: true },
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
  location: 'text',
  locality: 'text',
  address: 'text',
  amenities: 'text',
});

propertySchema.pre('validate', function createSlug() {
  if (!this.location && this.locality) this.location = this.locality;
  if (!this.locality && this.location) this.locality = this.location;
  if (!this.address && this.location) this.address = this.location;
  if (this.area === undefined && this.landArea !== undefined) this.area = this.landArea;
  if (this.landArea === undefined && this.area !== undefined) this.landArea = this.area;

  if (this.isModified('title') || !this.slug) {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    const suffix = this._id ? `-${this._id.toString().slice(-6)}` : '';
    this.slug = `${baseSlug}${suffix}`;
  }
});

export default mongoose.model('Property', propertySchema);
