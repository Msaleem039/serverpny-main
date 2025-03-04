import express from 'express';
import { createBlogPost, createCityCategory, deleteCityCategory, getAllCityCategories, getBlogsByCity, getCityCategoryById, updateCityCategory } from '../controllers/cityCategoryController.js';
// import { createBlogPost } from '../controllers/special.blogPostController.js';

const specialcityroutes= express.Router();

specialcityroutes.post('/', createCityCategory);
specialcityroutes.get('/', getAllCityCategories);
specialcityroutes.get('/:id', getCityCategoryById);
specialcityroutes.put('/:id', updateCityCategory);
specialcityroutes.delete('/:id',deleteCityCategory);
specialcityroutes.post('/blog/:citySlug', createBlogPost);
specialcityroutes.get('/citycategory/:citySlug', getBlogsByCity);
export default specialcityroutes;
