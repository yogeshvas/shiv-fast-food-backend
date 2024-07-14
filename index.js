import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getDashboardData } from './controllers/admin.js';
import connectDB from './db/connectMongo.js';
import kitchenRoutes from './routes/kitchen.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/order.js';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions)); // Use CORS middleware with options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', getDashboardData);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/kitchen', kitchenRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
