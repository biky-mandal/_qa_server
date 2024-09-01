import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createSubCategory, fetchSubCategories } from '../controllers/subCategoryController.js'

const router = express.Router();

router.post('/create', isAuthenticated, createSubCategory);
router.get('/fetch', isAuthenticated, fetchSubCategories);


export default router;

