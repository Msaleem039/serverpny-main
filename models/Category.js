import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  Category_Name: { type: String, required: true, unique: true },
  url_Slug: { type: String, required: true, unique: true },
  short_Description: { type: String },
  meta_Title: { type: String },
  meta_Description: { type: String },
  in_Sitemap: { type: Boolean, default: false },
  index_Page_Option: { type: Boolean, default: false },
  custom_Canonical_Url: { type: String },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // FIXED: Referencing multiple courses
  instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }] // FIXED: Referencing multiple instructors
});
const Category = mongoose.model('Category', categorySchema);
export default Category;
