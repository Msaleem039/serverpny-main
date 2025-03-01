// import Category from '../models/Category.js';
// export const createCategory = async (req, res) => {
//   try {
//     const { Category_Name, url_Slug, short_Description, meta_Title, meta_Description } = req.body;
//     const existingCategory = await Category.findOne({ url_Slug });
//     if (existingCategory) {
//       return res.status(400).json({ message: 'Category with this slug already exists.' });
//     }
//     const category = new Category({
//       Category_Name,
//       url_Slug,
//       short_Description,
//       meta_Title,
//       meta_Description,
//     });
//     await category.save();
//     res.status(201).json(category);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.status(200).json(categories);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };






// // // Create Category
// // export const createCategory = async (req, res) => {
// //   try {
// //     const {
// //       Category_Name,
// //       url_Slug,
// //       short_Description,
// //       meta_Title,
// //       meta_Description,
// //       in_Sitemap,
// //       index_Page_Option,
// //       custom_Canonical_Url,
// //     } = req.body;

// //     // Check if the category name already exists
// //     const existingCategory = await Category.findOne({
// //       Category_Name: Category_Name.toLowerCase(),
// //     });
// //     if (existingCategory) {
// //       return res.status(400).json({ message: "Category with this name already exists." });
// //     }

// //     // Create a new category
// //     const category = new Category({
// //       Category_Name,
// //       url_Slug,
// //       short_Description,
// //       meta_Title,
// //       meta_Description,
// //       in_Sitemap,
// //       index_Page_Option,
// //       custom_Canonical_Url,
// //     });

// //     // Save the category
// //     await category.save();

// //     res.status(201).json(category);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // };



// // // Get all Categories
// // export const getCategories = async (req, res) => {
// //   try {
// //     const categories = await Category.find();
// //     res.status(200).json(categories);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // Update Category
// // export const updateCategory = async (req, res) => {
// //   try {
// //     const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     res.status(200).json(updatedCategory);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // };

// // // Delete Category
// // export const deleteCategory = async (req, res) => {
// //   try {
// //     await Category.findByIdAndDelete(req.params.id);
// //     res.status(200).json({ message: 'Category deleted' });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // getCategory by id 
// // export const getCategoryById = async (req, res) => {
// //   try {
// //     const category = await Category.findById(req.params.id);
// //     if (!category) return res.status(404).json({ message: 'Category not found' });
// //     res.status(200).json(category);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };
// import Category from '../models/Category.js';
import Course from '../models/Course.js';
import Instructor from '../models/Instructor.js';

import Category from "../models/Category.js";
// Get All Categories with Courses & Instructors
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("courses").populate("instructors");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// Create Category
export const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: "Bad Request", details: error.message });
  }
};

// Get Single Category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("courses").populate("instructors");
    if (!category) return res.status(404).json({ error: "Category Not Found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: "Bad Request", details: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
// export const getCourseBySlug = async (req, res) => {
//   try {
//     const course = await Course.findOne({ url_Slug: req.params.slug }).populate("course_Category").populate("Instructor");
//     if (!course) return res.status(404).json({ error: "Course Not Found" });

//     res.json(course);
//   } catch (error) {
//     res.status(500).json({ error: "Server Error", details: error.message });
//   }
// };

// export const getCategoryBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;

//     const category = await Category.findOne({ url_Slug: slug })
//       .populate({
//         path: 'courses',
//         model: 'Course'
//       })
//       .populate({
//         path: 'instructors',
//         model: 'Instructor'
//       });

//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     res.status(200).json(category);
//   } catch (error) {
//     console.error('Error fetching category:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

export const getCategoryBySlug = async (req, res) => {
  try {
    const { url_Slug } = req.params;

    // Find the category
    const category = await Category.findOne({ url_Slug: url_Slug });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Fetch courses manually
    const categoryCourses = await Course.find({ course_Category: category._id })
      .select('course_Name url_Slug course_Image Monthly_Fee Instructor');

    // Fetch instructors manually
    const instructorIds = categoryCourses.map(course => course.Instructor);
    const categoryInstructors = await Instructor.find({ _id: { $in: instructorIds } })
      .select('name photo other_info');

    // Transform the category object to match the desired output
    const transformedCategory = {
      _id: category._id,
      id: category._id.toString(),
      name: category.Category_Name,
      url_slug: category.url_Slug,
      description_short: category.short_Description,
      meta_title: category.meta_Title,
      meta_description: category.meta_Description,
      category_courses: categoryCourses.map(course => ({
        id: course._id.toString(),
        name: course.course_Name,
        course_image: course.course_Image,
        monthly_tution_fee: course.Monthly_Fee,
        url_slug: course.url_Slug,
        teacher: course.Instructor
      })),
      category_instructors: categoryInstructors.map(instructor => ({
        id: instructor._id.toString(),
        name: instructor.name,
        photo: instructor.photo,
        other_info: instructor.other_info
      })),
      __v: category.__v
    };

    res.status(200).json(transformedCategory); // Removed extra array wrapping
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
