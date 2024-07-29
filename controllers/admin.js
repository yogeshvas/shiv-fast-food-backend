import { Order } from "../models/order.js";

export const getDashboardData = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

    const startOfMonth = new Date(startOfDay);
    startOfMonth.setDate(1); // Set day to the first day of the month
    startOfMonth.setHours(0, 0, 0, 0); // Set time to 00:00:00
    
    const acceptedOrders = await Order.find({
      status: { $in: ["PLACED", "ACCEPTED"] },
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
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

    // Start of the week (Sunday)
    const startOfWeek = new Date(startOfDay);
    const dayOfWeek = startOfDay.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    startOfWeek.setDate(startOfDay.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);

    // Find all orders for the current week
    const weekOrders = await Order.find({
      createdAt: {
        $gte: startOfWeek,
        $lt: endOfDay,
      },
    });

    // Initialize an array with 7 zeros
    const weeklyEarnings = new Array(7).fill(0);

    // Segregate orders based on the day of the week and calculate total amounts
    weekOrders.forEach((order) => {
      const orderDay = new Date(order.createdAt).getDay();
      weeklyEarnings[orderDay] += order.totalAmount;
    });

    res.status(200).json({
      acceptedOrders: acceptedOrders.length,
      allOrders: todayOrders.length,
      totalAmountToday,
      totalAmountMonthly,
      weeklyEarnings,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get dashboard data", error });
  }
};
