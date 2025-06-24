import express from 'express';
import multer from 'multer';
import Category from '../models/Category.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(process.cwd(), 'uploads');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/categories - create a new category
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const image = req.file ? req.file.path.replace(/\\/g, '/') : '';
    const category = new Category({ name, image });
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/categories - get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/categories/:id - update a category
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    let image;
    if (req.file) {
      image = req.file.path.replace(/\\/g, '/');
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name || category.name;
    if (image) {
      category.image = image;
    }

    await category.save();
    res.json({ message: 'Category updated successfully', category });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/categories/:id - delete a category
router.delete('/:id', async (req, res) => {
  try {
    const result = await Category.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router; 