import { Category } from "../models/category.js";

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation checks
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ message: "Invalid category name" });
    }

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create and save the new category
    const newCategory = await Category.create({ name });

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error in addCategory:", error.stack);
    return res.status(500).json({ message: "Can't add a new category" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error in getCategories:", error.stack);
    return res.status(500).json({ message: "Can't get categories" });
  }
};
