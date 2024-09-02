import express from "express";
import { allCategoriesWithSubCategories, createCategory, fetchCategories } from "../controllers/categoryController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/create', isAuthenticated, createCategory);
router.get('/fetch', isAuthenticated, fetchCategories);

// These are for Admin
router.get('/admin/categories', isAuthenticated, isAdmin, allCategoriesWithSubCategories);


export default router;

