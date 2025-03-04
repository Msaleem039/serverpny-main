
import BlogCategory from '../models/BlogCategory.js';
import infoBlogPost from '../models/infoBlogPost.js';
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

  export const getBlogsByCategorySlug = async (req, res) => {
    try {
        const { urlSlug } = req.params;

        // Find the category and populate the blogs field
        const category = await BlogCategory.findOne({ urlSlug }).populate({
            path: 'blogs',
            select: 'postTitle urlSlug postThumbnailImage shortDescription postDescription isPublish featured createdAt'
        });

        if (!category) {
            return res.status(404).json({ message: 'Blog category not found' });
        }

        // Transform response
        const response = {
            _id: category._id,
            categoryName: category.categoryName,
            urlSlug: category.urlSlug,
            shortDescription: category.shortDescription,
            metaTitle: category.metaTitle,
            metaDescription: category.metaDescription,
            blogs: category.blogs.map(blog => ({
                id: blog._id.toString(),
                title: blog.postTitle,
                thumbnail: blog.postThumbnailImage,
                short_description: blog.shortDescription,
                description: blog.postDescription,
                url_slug: blog.urlSlug,
                is_published: blog.isPublish,
                featured: blog.featured,
                created_at: blog.createdAt,
            })),
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
