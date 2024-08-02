import { Category } from "../models/Category.js";
import { FoodItem } from "../models/food-item.js";

export const addFoodItem = async (req, res) => {
  try {
    const { name, price, availability, nonVeg, category } = req.body;

    // Validation checks
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (price === undefined || typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Invalid price" });
    }
    if (!category || typeof category !== "string" || category.trim().length === 0) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Check if the category exists
    const categoryExists = await Category.findOne({ name: category });
    if (!categoryExists) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    // Saving food to database
    const newFoodItem = await FoodItem.create({
      name,
      price,
      availability,
      nonVeg,
      category,
    });

    return res.status(201).json(newFoodItem);
  } catch (error) {
    console.error("Error in addFoodItem:", error.stack);
    return res.status(500).json({ message: "Can't add a new food item" });
  }
};

export const updateFoodItem = async (req, res) => {
  try {
    const { availability, price, id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Food item ID is required" });
    }

    const foodItem = await FoodItem.findById(id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    if (typeof availability !== "undefined") {
      foodItem.availability = availability;
    }

    if (price) {
      foodItem.price = price;
    }

    const updatedFoodItem = await foodItem.save();

    return res.status(200).json(updatedFoodItem);
  } catch (error) {
    console.error("Error in updateFoodItem:", error.stack);
    return res.status(500).json({ message: "Can't update a food item" });
  }
};

export const getMenu = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    return res.status(200).json(foodItems);
  } catch (error) {
    console.error("Error in getMenu:", error.stack);
    return res.status(500).json({ message: "can't get menu" });
  }
};
