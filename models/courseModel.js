import mongoose from 'mongoose';

const CourseOutlineSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Assuming you already have a Course model
  },
  textEditor: {
    type: String,

  },
  status: {
    type: Boolean,
 
  },
  courseModulePosition: {
    type: Number,
 
  },
}, { timestamps: true });
const CourseOutline = mongoose.model('CourseOutline', CourseOutlineSchema);

// Export the CourseOutline model for use in other parts of your application

export default CourseOutline;