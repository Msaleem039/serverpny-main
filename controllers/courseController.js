import Course from '../models/Course.js';
import Category from '../models/Category.js';
import { uploadFiles } from '../multer/multerConfig.js';



// Create Course with Cloudinary image upload
export const createCourse = async (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
      // Get file paths if files were uploaded
      const courseImage = req.files['course_Image'] ? req.files['course_Image'][0].path : null;
      const brochure = req.files['Brochure'] ? req.files['Brochure'][0].path : null;
      const courseData = {
        ...req.body,
        course_Image: courseImage,
        Brochure: brochure,
      };
      const course = new Course(courseData);
      await course.save();
      res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
      res.status(400).json({ message: 'Internal server errror' + error.message });
    }
  });
};
// Get all Courses with populated category data
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('course_Category'); // Populate Category data
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update Course with Cloudinary image upload
export const updateCourse = async (req, res) => {
  // Use uploadCourseFiles as middleware to process the incoming files
  uploadFiles(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      // Check if course ID is provided
      const existingCourse = await Course.findById(req.params.id);
      if (!existingCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }

      // Ensure the category exists if it is being updated
      if (req.body.course_Category) {
        const category = await Category.findById(req.body.course_Category);
        if (!category) {
          return res.status(400).json({ message: 'Invalid category ID' });
        }
      }

      // Log the files and body for debugging
      // console.log("Files:", req.files);
      // console.log("Body:", req.body);

      // Use existing image if no new file uploaded
      const courseImage = req.files && req.files['course_Image']
        ? req.files['course_Image'][0].path
        : existingCourse.course_Image;

      const brochure = req.files && req.files['Brochure']
        ? req.files['Brochure'][0].path
        : existingCourse.Brochure;

      // Prepare updated data
      const updatedData = {
        ...req.body,
        course_Image: courseImage,
        Brochure: brochure,
      };

      // Update the course
      const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updatedData, { new: true });

      res.status(200).json({ message: 'Course updated successfully', updatedCourse });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};


// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single Course by ID with populated category data
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('course_Category');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};