import { TryCatch } from "../middlewares/error.js";
import { Category } from "../models/category.js";
import { SubCategory } from "../models/subCategory.js";

const createCategory = TryCatch(async (req, res, next) => {
    const { name } = req.body;
    const _category = await Category.create({ name });

    res.status(201).json({
        success: true,
        message: "Category created!",
        category: _category
    })
})

const fetchCategories = TryCatch(async (req, res, next) => {

    const { name } = req.query;
    let _categories = null;

    if (name) { // User will get single Category based on Query
        _categories = await Category.findOne({ name })
    } else { // Otherwise all categories
        _categories = await Category.find({});
    }

    res.status(200).json({
        success: true,
        categories: _categories
    })
})

const allCategoriesWithSubCategories = TryCatch(async (req, res, next) => {

    let _categories = await Category.find({});
    let _subcategories = await SubCategory.find().populate('category', 'name');

    res.status(200).json({
        success: true,
        categories: _categories,
        subcategories: _subcategories
    })
})

export { createCategory, fetchCategories, allCategoriesWithSubCategories }