// routes/cityCategoryRoutes.js
import express from 'express';
import { CreateblogCategory, deleteBlogCat, getBlogCatbyid, getBlogCategories, updateblogCat } from '../controllers/BlogCatcontroller.js';
const blogcatroutes = express.Router();
// @route POST /api/city-categories
blogcatroutes.post('/',CreateblogCategory);

// @route GET /api/city-categories/:id
blogcatroutes.get('/',getBlogCategories);

// @route PUT /api/city-categories/:id
blogcatroutes.put('/:id',updateblogCat);

// @route DELETE /api/city-categories/:id
blogcatroutes.delete('/:id',deleteBlogCat);

blogcatroutes.get('/:id',getBlogCatbyid);
export default blogcatroutes;