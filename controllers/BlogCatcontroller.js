
import BlogCategory from '../models/BlogCategory.js';
import cloudinary from '../lib/cloudinary.js';
// import BlogPost from '../models/blogpost.js';
// Add a new category
export const CreateblogCategory = async (req, res) => {
  try {
    const category = new BlogCategory(req.body);
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error });
  }
};

// Fetch all categories with associated blogs
export const getBlogCategories = async (req, res) => {
  try {
    const categories = await BlogCategory.find().populate('blogs');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve categories', error });
  }
};
export const getBlogCatbyid = async (req, res) => {
try {
    const category = await BlogCategory.findById(req.params.id).populate('blogs');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
} catch (error) {
    res.status(500).json({ message: 'Failed to fetch category', error });
  }
  };
  // Update a category
  export const updateblogCat = async (req, res) => {
    try {
      const category = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update category', error });
    }
  };
  
  // Delete a category
  export const deleteBlogCat = async (req, res) => {
    try {
      const category = await BlogCategory.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete category', error });
    }
  };
 //  // Fetch all blogs in a category
// Add a blog to a category
// export const addBlogToCategory = async (req, res) => {
//   try {
//     const { blogId, categoryId } = req.body;

//     const category = await BlogCategory.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     // Add the blog to the category
//     category.BlogPost.push(blogId);
//     await category.save();

//     res.status(200).json({ message: 'Blog added to category successfully', category });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to add blog to category', error });
//   }
// };

// // Fetch a blog by ID
