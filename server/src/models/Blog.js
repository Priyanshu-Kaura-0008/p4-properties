import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, unique: true, lowercase: true, index: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 300 },
    content: { type: String, required: true, trim: true },
    category: { type: String, trim: true, index: true },
    tags: [{ type: String, trim: true }],
    coverImage: {
      url: { type: String },
      publicId: { type: String },
    },
    published: { type: Boolean, default: false, index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', category: 'text', tags: 'text' });

blogSchema.pre('validate', function createSlug(next) {
  if (this.isModified('title') || !this.slug) {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    const suffix = this._id ? `-${this._id.toString().slice(-6)}` : '';
    this.slug = `${baseSlug}${suffix}`;
  }

  next();
});

export default mongoose.model('Blog', blogSchema);
