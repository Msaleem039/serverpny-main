// models/BlogPost.js
import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    // required: true, // Post Title is required
  },
  urlSlug: {
    type: String,
    // required: true,
    // unique: true, // Slug must be unique
  },
  postCategory: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a Post Category model
    ref: 'BlogCategory',
    // required: true, // Category is required
  },
  postThumbnailImage: {
    type: String, // URL for the uploaded thumbnail image
 
  },
  shortDescription: {
    type: String, // Short description as text area
  },
  postDescription: {
    type: String, // Full post content from a text editor like CKEditor or TinyMCE
  },
  isPublish: {
    type: Boolean,
    // required: true,
    default: false, // Default as unpublished
  },
  featured: {
    type: Boolean,
    default: false, // Default as not featured
  },
  metaTitle: {
    type: String, // Meta title for SEO
  },
  metaDescription: {
    type: String, // Meta description for SEO
  },
  inSitemap: {
    type: Boolean,
    default: false, // Default is not in the sitemap
  },
  pageIndex: {
    type: Boolean,
    default: false, // Default is not to be indexed
  },
  customCanonicalUrl: {
    type: String, // Custom canonical URL
  },
}, { timestamps: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;

