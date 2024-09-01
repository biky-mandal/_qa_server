import express from "express";
import { createCategory, fetchCategories } from "../controllers/categoryController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/create', isAuthenticated, createCategory);
router.get('/fetch', isAuthenticated, fetchCategories);


export default router;

