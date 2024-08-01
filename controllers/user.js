import { User } from "../models/user.js";

export const register = async (req, res) => {
  try {
    // Validate the input

    const { uid } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = await User.create({ uid });

    // Respond with the created user details
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findOne({ uid }).populate({
      path: "orders",
      populate: {
        path: "items.foodItem",
      },
    });
    if (!user) {
      return res.status(200).json({ message: "No Order Fount" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching order history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
