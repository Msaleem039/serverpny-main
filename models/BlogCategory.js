import mongoose from "mongoose";

const BlogcategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  urlSlug: { type: String, required: true, unique: true, lowercase: true },
  shortDescription: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
  inSitemap: { type: Boolean, required: true, default: false },
  indexPage: { type: Boolean, required: true, default: false },
  canonicalUrl: { type: String },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'infoBlogPost', // ✅ Correct reference
  }],
}, { timestamps: true });

const BlogCategory = mongoose.model('BlogCategory', BlogcategorySchema);
export default BlogCategory;
