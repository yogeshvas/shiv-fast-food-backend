import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerPhoneNo: {
      type: Number,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    items: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FoodItem",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PLACED", "ACCEPTED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },
    customization: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Order = mongoose.model("Order", orderSchema);
