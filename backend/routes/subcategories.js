import express from 'express';
import multer from 'multer';
import path from 'path';
import SubCategory from '../models/SubCategory.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create Sub-Category
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, category } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, '/') : '';
    const newSubCategory = new SubCategory({ name, category, image });
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Sub-Categories
router.get('/', async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate('category');
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Sub-Category
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, category } = req.body;
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }

    subCategory.name = name || subCategory.name;
    subCategory.category = category || subCategory.category;
    if (req.file) {
      subCategory.image = req.file.path.replace(/\\/g, '/');
    }

    await subCategory.save();
    res.json(subCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Sub-Category
router.delete('/:id', async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }
    res.json({ message: 'Sub-category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 