import express from "express";
import {
  addOrder,
  getAllOrders,
  getTodayAcceptedOrders,
  getTodayActiveOrders,
  getTodayCancelledOrders,
  getTodayDeliveredOrders,
  updateOrderStatus,
} from "../controllers/order.js";

const router = express.Router();

router.route("/").post(addOrder);
router.route("/all-orders").get(getAllOrders);
router.route("/get-active-order").get(getTodayActiveOrders);
router.route("/get-accepted-order").get(getTodayAcceptedOrders);
router.route("/get-delivered-order").get(getTodayDeliveredOrders);
router.route("/get-cancelled-order").get(getTodayCancelledOrders);
router.route("/update-order-status").post(updateOrderStatus);

export default router;
