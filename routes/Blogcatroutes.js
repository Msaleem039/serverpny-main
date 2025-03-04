// routes/cityCategoryRoutes.js
import express from 'express';
import { CreateblogCategory, deleteBlogCat, getBlogCatbyid, getBlogCategories, getBlogsByCategorySlug, updateblogCat } from '../controllers/BlogCatcontroller.js';
const blogcatroutes = express.Router();
// @route POST /api/city-categories
blogcatroutes.post('/blogcate',CreateblogCategory);

// @route GET /api/city-categories/:id
blogcatroutes.get('/api/blogcate',getBlogCategories);

// @route PUT /api/city-categories/:id
blogcatroutes.put('/blogcate/:id',updateblogCat);

// @route DELETE /api/city-categories/:id
blogcatroutes.delete('/blogcate/:id',deleteBlogCat);

blogcatroutes.get('/blogcate/:id',getBlogCatbyid);
blogcatroutes.get('/api/blogcate/:urlSlug',getBlogsByCategorySlug);
export default blogcatroutes;