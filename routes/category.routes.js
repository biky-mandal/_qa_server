import express from "express";
import { allCategoriesWithSubCategories, createCategory, deleteCategory, fetchCategories } from "../controllers/categoryController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get('/fetch', isAuthenticated, fetchCategories);

// These are for Admin
router.get('/admin/categories', isAuthenticated, isAdmin, allCategoriesWithSubCategories);
router.post('/admin/create', isAuthenticated, isAdmin, createCategory);
router.delete('/admin/delete', isAuthenticated, isAdmin, deleteCategory);


export default router;

