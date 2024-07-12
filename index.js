import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectMongo.js";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/order.js";
import kitchenRoutes from "./routes/kitchen.js";
import { getDashboardData } from "./controllers/admin.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", getDashboardData);

app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/kitchen", kitchenRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running on port 3000");
  connectDB();
});
