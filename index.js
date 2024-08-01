import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { getDashboardData } from "./controllers/admin.js";
import connectDB from "./db/connectMongo.js";
import categoryRoutes from "./routes/category.js";
import kitchenRoutes from "./routes/kitchen.js";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/order.js";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://shiv-fast-food.netlify.app", // Allow your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions)); // Use CORS middleware with options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", getDashboardData);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/kitchen", kitchenRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
