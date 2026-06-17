import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    location: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, trim: true, maxlength: 1200 },
    image: {
      url: { type: String },
      publicId: { type: String },
    },
    featured: { type: Boolean, default: false, index: true },
    approved: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export default mongoose.model('Testimonial', testimonialSchema);
