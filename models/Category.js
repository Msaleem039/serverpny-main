import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  Category_Name: { type: String, required: true }, // Required field for category name
  url_Slug: { type: String, required: true },
  short_Description: { type: String },
  meta_Title: { type: String },
  meta_Description: { type: String },
  in_Sitemap: { type: Boolean, default: false },
  index_Page_Option: { type: Boolean, default: false },
  custom_Canonical_Url: { type: String },
  category_Icons: { type: String }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
