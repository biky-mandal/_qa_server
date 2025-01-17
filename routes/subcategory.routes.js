import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { allSubCategories, createSubCategory, fetchSubCategories } from '../controllers/subCategoryController.js'

const router = express.Router();

router.post('/create', isAuthenticated, createSubCategory);
router.get('/fetch', isAuthenticated, fetchSubCategories);

// Admin ROute
router.post('/admin/create', isAuthenticated, isAdmin, createSubCategory);



export default router;

