import express from "express";
import { addFoodItem, getMenu, updateFoodItem } from "../controllers/menu.js";

const router = express.Router();

router.route("/add-item").post(addFoodItem);
router.route("/update-item").patch(updateFoodItem);
router.route("/get-item").get(getMenu);

export default router;
