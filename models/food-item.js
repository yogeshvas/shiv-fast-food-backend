import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    nonVeg: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/collection-fast-food-various-types-drawing-items-graphic-design-banner-sticker-advertising-fast-food-beverage-theme-vector-illustration_1150-58732.jpg",
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodItem = mongoose.model("FoodItem", foodItemSchema);
