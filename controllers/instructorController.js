import Category from '../models/Category.js';
import Instructor from '../models/Instructor.js';
import { uploadFiles } from '../multer/multerConfig.js';
// Create Category
export const createInstructor = async (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
      // Get file paths if files were uploaded
      const instructorImage = req.files['photo'] ? req.files['photo'][0].path : null;
      const instructorData = {
        ...req.body,
        photo:instructorImage,
      };
      const instructor = new Instructor(instructorData);
      await instructor.save();
      res.status(201).json({ message: 'Course created successfully', instructor });
    } catch (error) {
      res.status(400).json({ message: 'Internal server errror' + error.message });
    }
  });
};



// Get all categories
export const getInstructor = async (req, res) => {
  try {
    const categories = await Instructor.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
export const updateInstructor = async (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      // Check if a new photo file is uploaded
      const updatedData = { ...req.body };
      if (req.files && req.files['photo']) {
        updatedData.photo = req.files['photo'][0].path; // Update with new file path
      }

      // Update the instructor document
      const updatedInstructor = await Instructor.findByIdAndUpdate(req.params.id, updatedData, { new: true });

      res.status(200).json({ message: 'Instructor updated successfully', updatedInstructor });
    } catch (error) {
      res.status(400).json({ message: 'Internal server error: ' + error.message });
    }
  });
};


// Delete Category
export const deleteInstructor = async (req, res) => {
  try {
    await Instructor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const instructorbyid = async (req, res) => {
  try {
   const data =  await Instructor.findById(req.params.id);
    res.status(200).json({ message: 'detail fetch', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};