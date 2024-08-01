import express from 'express';
import { addCategory, getCategories } from '../controllers/category.js';



const router = express.Router();

// Route to add a new category
router.post('/add-category', addCategory);

// Route to get all categories
router.get('/', getCategories);

export default router;
