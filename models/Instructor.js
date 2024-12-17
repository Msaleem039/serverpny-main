import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
  name:{ type: String},
  photo: { type: String },
  other_info: { type: String },
  in_View: { type: Boolean, default: true }
});
const Instructor = mongoose.model('Instructor', instructorSchema);
export default Instructor;
