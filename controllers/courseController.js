import Category from '../models/Category.js';
import Course from '../models/Course.js';

export const createCourse = async (req, res) => {
  try {
    const { course_Name, url_Slug, course_Category, Short_Description, Course_Description } = req.body;

    const existingCourse = await Course.findOne({ url_Slug });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course with this slug already exists.' });
    }

    const newCourse = new Course({
      course_Name,
      url_Slug,
      course_Category,
      Short_Description,
      Course_Description,
    });

    await newCourse.save();

    // ✅ Add new course to the corresponding category
    await Category.findByIdAndUpdate(
      course_Category,
      { $push: { courses: newCourse._id } }, // Push the new course ID to `courses` array
      { new: true }
    );

    res.status(201).json({
      message: 'Course created successfully',
      course: newCourse,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getallCourses = async (req, res) =>{
  try {
    const courses = await Course.find({}).populate('course_Category');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const getCoursesByCategorySlug = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const category = await Category.findOne({ url_Slug: categorySlug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const courses = await Course.find({ course_Category: category._id }).populate('course_Category');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const { courseSlug } = req.params;
    const course = await Course.findOne({ url_Slug: courseSlug }).populate('course_Category');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCoursesByName = async (req, res) => {
  try {
      const categoryId = req.params.categoryId; // Get category ID from URL
      const courses = await Course.find({ course_Category: categoryId }); // Filter courses by category
      res.status(200).json({ success: true, data: courses });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching courses', error });
  }
};











