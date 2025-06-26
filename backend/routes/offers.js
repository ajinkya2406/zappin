import express from 'express';
import multer from 'multer';
import Offer from '../models/Offer.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/offers - create a new offer
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { code, percentage, description, expiryDate, status } = req.body;
    if (!code || !percentage || !expiryDate) {
      return res.status(400).json({ error: 'Code, percentage, and expiry date are required' });
    }
    const image = req.file ? req.file.path.replace(/\\/g, '/') : '';
    const offer = new Offer({ code, percentage, description, expiryDate, status, image });
    await offer.save();
    res.status(201).json({ message: 'Offer created successfully', offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/offers - get all offers
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/offers/:id - update an offer
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { code, percentage, description, expiryDate, status } = req.body;
    let image;
    if (req.file) {
      image = req.file.path.replace(/\\/g, '/');
    }
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    offer.code = code || offer.code;
    offer.percentage = percentage || offer.percentage;
    offer.description = description || offer.description;
    offer.expiryDate = expiryDate || offer.expiryDate;
    offer.status = status || offer.status;
    if (image) {
      offer.image = image;
    }
    await offer.save();
    res.json({ message: 'Offer updated successfully', offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/offers/:id - delete an offer
router.delete('/:id', async (req, res) => {
  try {
    const result = await Offer.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ message: 'Offer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 