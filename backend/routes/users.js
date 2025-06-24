import express from 'express';
import multer from 'multer';
import path from 'path';
import User from '../models/User.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/users - create a new user
router.post('/', upload.fields([
  { name: 'adharFile', maxCount: 1 },
  { name: 'passportPhoto', maxCount: 1 },
]), async (req, res) => {
  try {
    const {
      role, fullName, mobile, email, flat, building, street, landmark, pincode, adhar, status
    } = req.body;
    const adharFile = req.files['adharFile'] ? req.files['adharFile'][0].path : '';
    const passportPhoto = req.files['passportPhoto'] ? req.files['passportPhoto'][0].path : '';
    const user = new User({
      role, fullName, mobile, email, flat, building, street, landmark, pincode, adhar, status,
      adharFile, passportPhoto
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users?role=Customer or role=Delivery Boy
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 