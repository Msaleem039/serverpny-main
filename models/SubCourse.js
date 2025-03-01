// import mongoose from "mongoose";

// const courseSchema = new mongoose.Schema({
//   course_Name: { type: String, required: true }, 
//   url_Slug: { type: String },
//   featured_Option: { type: Boolean, default: false },
//   Imagesub: { type: String },
//   video_Id: { type: String },
//   Skill_Level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
//   Short_Description: { type: String },
//   Course_Description: { type: String },
//   Instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }, // One-to-Many relationship
//   Monthly_Fee: { type: Number },
//   Admission_Fee: { type: String },
//   Duration_Months: { type: Number },
//   Duration_Day: { type: Number },
//   Meta_Title: { type: String },
//   Meta_Description: { type: String },
//   Brochuresub: { type: String },
//   status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
//   View_On_Web: { type: Boolean, default: false },
//   In_Sitemap: { type: Boolean, default: false },
//   Page_Index: { type: Boolean, default: false },
//   Custom_Canonical_Url: { type: String },
// });

// // ✅ Fixed missing closing `}` for schema
// const SubCourse =  mongoose.model("SubCourse", courseSchema);
// export default SubCourse;


import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  course_Name: {
    type: String,
    required: true,
  },
  url_Slug: {
    type: String,
  },
  featured_Option: {
    type: Boolean,
    default: false,
  },
  Imagesub: { type: String, default: null },
  video_Id: {
    type: String,
  },
  Skill_Level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  Short_Description: {
    type: String,
  },
  Course_Description: {
    type: String,
  },
  Instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor', // Reference to the Instructor model
  },
  Monthly_Fee: {
    type: Number,
  },
  Admission_Fee: {
    type: String,
  },
  Duration_Months: {
    type: Number,
  },
  Duration_Day: {
    type: Number,
  },
  Meta_Title: {
    type: String,
  },
  Meta_Description: {
    type: String,
  },
  Brochuresub: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  View_On_Web: {
    type: Boolean,
    default: false,
  },
  In_Sitemap: {
    type: Boolean,
    default: false,
  },
  Page_Index: {
    type: Boolean,
    default: false,
  },
  Custom_Canonical_Url: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true,
  },
});

const SubCourse = mongoose.model('SubCourse', courseSchema);
export default SubCourse;