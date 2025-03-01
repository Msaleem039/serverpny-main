// import express from 'express';
// import { 
//   createCategory, 
//   getCategories, 
//   updateCategory, 
//   deleteCategory, 
//   getCategoryById 
// } from '../controllers/categoryController.js';
import express from "express";
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryBySlug
} from "../controllers/categoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/api/category", getCategories);
categoryRoutes.post("/", createCategory);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.put("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);

// export default router;

// 

// categoryRoutes.post('/', createCategory);
// categoryRoutes.get('/', getCategories);
// router.get('/:id', getCategoryById);
// router.put('/:id', updateCategory);
// router.delete('/:id', deleteCategory);

categoryRoutes.get('/api/category/:url_Slug',getCategoryBySlug);

export default categoryRoutes;
// import express from 'express';
// import { createCategory, getCategories, updateCategory, deleteCategory, getCategoryById } from '../controllers/categoryController.js';

// const router = express.Router();

// router.post('/', createCategory);
// router.get('/const categoryRoutes = express.Router();', getCategories);
// router.get('/:id', getCategoryById);
// router.put('/:id', updateCategory);
// router.delete('/:id', deleteCategory);

// export default router;
