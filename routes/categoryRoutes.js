
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
categoryRoutes.get('/api/category/:url_Slug',getCategoryBySlug);

export default categoryRoutes;
