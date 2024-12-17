// routes/cityCategoryRoutes.js
import express from 'express';
import { createNewBlog, deleteBlog, getAllBlog, getBlogById, updateBlog } from '../controllers/blogpostcontroller.js';
import { upload } from '../middlewar/multer.js';


const blogpostrouter = express.Router();

// @route GET /api/city-categories
blogpostrouter.get('/',getAllBlog);

// @route POST /api/city-categories
// blogpostrouter.post('/',createNewBlog);
blogpostrouter.post('/', createNewBlog);
// @route GET /api/city-categories/:id
blogpostrouter.get('/:id', getBlogById);

// @route PUT /api/city-categories/:id
blogpostrouter.put('/:id',updateBlog);

// @route DELETE /api/city-categories/:id
blogpostrouter.delete('/:id', deleteBlog);

export default blogpostrouter;
