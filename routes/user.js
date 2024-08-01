import express from "express";
import { getOrderHistory, register } from "../controllers/user.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/get-order-history").post(getOrderHistory);

export default router;
