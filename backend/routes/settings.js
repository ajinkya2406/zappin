import express from 'express';
import Admin from '../models/Admin.js';
import authMiddleware from '../middleware/authMiddleware.js';
import bcrypt from 'bcryptjs';
const router = express.Router();

// Get settings
router.get('/', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update settings
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { firmName, firmMobile, firmEmail, firmAddress, username, oldPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update general info
    admin.firmName = firmName;
    admin.firmMobile = firmMobile;
    admin.firmEmail = firmEmail;
    admin.firmAddress = firmAddress;
    admin.username = username;

    // Update password if provided
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }
      admin.password = newPassword; // Hashing is handled by pre-save hook
    }
    
    await admin.save();
    res.json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router; 