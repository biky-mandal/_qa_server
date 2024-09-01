import { TryCatch } from "../middlewares/error.js";
import { SubCategory } from "../models/subCategory.js";

const createSubCategory = TryCatch(async (req, res, next) => {
    const { name, category } = req.body;
    const _scategory = await SubCategory.create({ name, category });

    res.status(201).json({
        success: true,
        message: "Sub Category created!",
        subcategory: _scategory
    })
})

const fetchSubCategories = TryCatch(async (req, res, next) => {

    const { name, category } = req.query;
    let _scategories = null;

    if (name) { // User will get single Category based on Query
        _scategories = await SubCategory.findOne({ name })
    } else if (category) {
        _scategories = await SubCategory.find({ category })
    } else { // Otherwise all categories
        _scategories = await SubCategory.find({});
    }

    res.status(200).json({
        success: true,
        subcategories: _scategories
    })
})

export { createSubCategory, fetchSubCategories }