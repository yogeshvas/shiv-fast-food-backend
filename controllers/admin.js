import { Order } from "../models/order.js";

export const getDashboardData = async (req, res) => {
  try {
    const acceptedOrders = await Order.find({ status: "ACCEPTED" });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

    const startOfMonth = new Date(startOfDay);
    startOfMonth.setDate(1); // Set day to the first day of the month
    startOfMonth.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const todayOrders = await Order.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    const monthlyOrders = await Order.find({
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfDay,
      },
    });

    const totalAmountToday = todayOrders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );
    const totalAmountMonthly = monthlyOrders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );

    res.status(200).json({
      acceptedOrders: acceptedOrders.length,
      allOrders: todayOrders.length,
      totalAmountToday,
      totalAmountMonthly,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get dashboard data", error });
  }
};
