import mongoose from "mongoose";

const kitchenSchema = new mongoose.Schema(
  {
    open: Boolean,
  },
  { timestamps: true }
);

export const Kitchen = mongoose.model("Kitchen", kitchenSchema);
