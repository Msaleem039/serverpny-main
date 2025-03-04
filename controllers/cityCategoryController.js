import CityCategory from "../models/cityCategoryModel.js";
import SBlogPost from "../models/sblogPostModel.js";

// Create a City Category
export const createCityCategory = async (req, res) => {
    try {
        const newCategory = new CityCategory(req.body);
        await newCategory.save();
        res.status(201).json({ message: 'City Category created successfully', newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
};

// Get all City Categories
export const getAllCityCategories = async (req, res) => {
    try {
        const categories = await CityCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
    }
};

// Get a single City Category

export const getCityCategoryById = async (req, res) => {
    try {
        const category = await CityCategory.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch category', error: error.message });
    }
};

// Update a City Category

export const updateCityCategory = async (req, res) => {
    try {
        const category = await CityCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
};

// Delete a City Category

export const deleteCityCategory = async (req, res) => {
    try {
        await CityCategory.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};


export const createBlogPost = async (req, res) => {
    try {
        const { citySlug } = req.params;
        const cityCategory = await CityCategory.findOne({ urlSlug: citySlug });

        if (!cityCategory) {
            return res.status(404).json({ message: 'City category not found' });
        }

        const newBlog = new SBlogPost({
            ...req.body,
            postCategory: cityCategory._id,
        });

        await newBlog.save();

        cityCategory.sblogposts.push(newBlog._id);
        await cityCategory.save();

        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all blog posts for a specific city category using urlSlug
export const getBlogsByCity = async (req, res) => {
    try {
        const { citySlug } = req.params;

        // Find the city category using the slug
        const cityCategory = await CityCategory.findOne({ urlSlug: citySlug });

        if (!cityCategory) {
            return res.status(404).json({ message: 'City category not found' });
        }

        // Fetch all blogs related to this category
        const blogs = await SBlogPost.find({ postCategory: cityCategory._id })
            .select('postTitle urlSlug postThumbnailImage shortDescription postDescription isPublish featured createdAt');

        // Transform the response structure
        const transformedCategory = {
            _id: cityCategory._id,
            name: cityCategory.cityCategoryName,
            url_slug: cityCategory.urlSlug,
            short_description: cityCategory.shortDescription,
            meta_title: cityCategory.metaTitle,
            meta_description: cityCategory.metaDescription,
            blogs: blogs.map(blog => ({
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

        res.status(200).json(transformedCategory);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
