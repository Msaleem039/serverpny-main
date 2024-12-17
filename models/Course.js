import mongoose from 'mongoose';
const courseSchema = new mongoose.Schema({
  course_Name: { type: String },
  url_Slug: { type: String },
  featured_Option: { type: Boolean, default: false },
  course_Image: {
    type: String,
  },
  video_Id: { type: String },
  course_Category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false }, // Ensure valid Category is provided
  Skill_Level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  Short_Description: { type: String },
  Course_Description: { type: String },
  Instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }, // One-to-Many relationship

  Monthly_Fee: { type: Number },
  Admission_Fee: { type: String },
  Duration_Months: { type: Number },
  Duration_Day: { type: Number },
  Meta_Title: { type: String },
  Meta_Description: { type: String},
  Brochure: { type: String },
  status: { type: String, enum: ["Active", "Inactive"],default: "Active" },
  View_On_Web: { type: Boolean, default: false },
  In_Sitemap: { type: Boolean, default: false },
  Page_Index: { type: Boolean, default: false },
  Custom_Canonical_Url: { type: String }
});
const Course = mongoose.model('Course', courseSchema);
export default Course;
