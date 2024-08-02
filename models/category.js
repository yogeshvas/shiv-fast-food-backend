import mongoose from "mongoose";
// done
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
