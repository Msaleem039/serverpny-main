import mongoose from "mongoose";

// Define Category Schema
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  urlSlug: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  inSitemap: {
    type: Boolean,
    required: true,
    enum: [true, false],
  },
  indexPage: {
    type: Boolean,
    required: true,
    enum: [true, false],
  },
  canonicalUrl: {
    type: String,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
  }],
}, { timestamps: true });

const BlogCategory = mongoose.model('BlogCategory', categorySchema);

export default BlogCategory