import Category from '../models/Category.js';

// Create Category
export const createCategory = async (req, res) => {
  try {
    const {
      Category_Name,
      url_Slug,
      short_Description,
      meta_Title,
      meta_Description,
      in_Sitemap,
      index_Page_Option,
      custom_Canonical_Url,
    } = req.body;

    // Check if the category name already exists
    const existingCategory = await Category.findOne({
      Category_Name: Category_Name.toLowerCase(),
    });
    if (existingCategory) {
      return res.status(400).json({ message: "Category with this name already exists." });
    }

    // Create a new category
    const category = new Category({
      Category_Name,
      url_Slug,
      short_Description,
      meta_Title,
      meta_Description,
      in_Sitemap,
      index_Page_Option,
      custom_Canonical_Url,
    });

    // Save the category
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Get all Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getCategory by id 
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};