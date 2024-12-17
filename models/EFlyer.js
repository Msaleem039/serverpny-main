// models/EFlyer.js
import mongoose from 'mongoose';

const eflyerSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Course',
    required: true,
  },
  flyerFile: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('EFlyer', eflyerSchema);
