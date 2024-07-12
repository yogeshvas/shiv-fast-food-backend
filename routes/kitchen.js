import express from "express";
import {
  getKitchenStaus,
  setKitchenStatus,
  updateKitchenStatus,
} from "../controllers/kitchen.js";

const router = express.Router();
router.route("/").get(getKitchenStaus);
router.route("/update-status").patch(updateKitchenStatus);
// router.route("/set-sta").post(setKitchenStatus);
export default router;
