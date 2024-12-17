import BlogCityCategory from "../models/blogpost.js"; // Ensure this imports the correct model
import { uploadFiles } from "../multer/multerConfig.js";


// Get all city categories
export const getAllBlog = async (req, res) => {
  try {
    const cityCategories = await BlogCityCategory.find();
    res.status(200).json(cityCategories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch city categories', error });
  }
};

// Create new city category
export const createNewBlog = async (req, res) => {
  uploadFiles(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });

      const {
          postTitle,
          urlSlug,
          postCategory,
          shortDescription,
          postDescription,
          isPublish,
          featured,
          metaTitle,
          metaDescription,
          inSitemap,
          pageIndex,
          customCanonicalUrl,
      } = req.body;

      try {
          // Check for existing slug
          const existingBlogPost = await BlogCityCategory.findOne({ urlSlug });
          if (existingBlogPost) return res.status(400).json({ message: 'Blog post with this slug already exists' });

          // Use uploaded image path or fallback to a placeholder if required
          const postThumbnailImage = req.files?.postThumbnailImage
              ? req.files.postThumbnailImage[0].path
              : ''; // Set a default or error as needed

          // Create new blog post
          const newBlogPost = new BlogCityCategory({
              postTitle,
              urlSlug,
              postCategory,
              postThumbnailImage,
              shortDescription,
              postDescription,
              isPublish,
              featured,
              metaTitle,
              metaDescription,
              inSitemap,
              pageIndex,
              customCanonicalUrl,
          });

          const savedBlogPost = await newBlogPost.save();
          res.status(201).json(savedBlogPost);
      } catch (error) {
          res.status(400).json({ message: 'Failed to create blog post', error: error.message });
      }
  });
};




// Get single city category by ID
export const getBlogById = async (req, res) => {
  try {
    const cityCategory = await BlogCityCategory.findById(req.params.id);
    if (!cityCategory) return res.status(404).json({ message: 'City category not found' });
    res.status(200).json(cityCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch city category', error });
  }
};

// Update city category
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const {
    postTitle,
    urlSlug,
    postCategory,
    postThumbnailImage,
    shortDescription,
    postDescription,
    isPublish,
    featured,
    metaTitle,
    metaDescription,
    inSitemap,
    pageIndex,
    customCanonicalUrl,
  } = req.body;

  try {
    const updatedCityCategory = await BlogCityCategory.findByIdAndUpdate(
      id,
      {
        postTitle,
        urlSlug,
        postCategory,
        postThumbnailImage,
        shortDescription,
        postDescription,
        isPublish,
        featured,
        metaTitle,
        metaDescription,
        inSitemap,
        pageIndex,
        customCanonicalUrl,
      },
      { new: true }
    );

    if (!updatedCityCategory) return res.status(404).json({ message: 'City category not found' });
    res.status(200).json(updatedCityCategory);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update city category', error });
  }
};

// Delete city category
export const deleteBlog = async (req, res) => {
  try {
    const deletedCityCategory = await BlogCityCategory.findByIdAndDelete(req.params.id);
    if (!deletedCityCategory) return res.status(404).json({ message: 'City category not found' });
    res.status(200).json({ message: 'City category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete city category', error });
  }
};
