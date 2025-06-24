import express from 'express';
import OutletLocation from '../models/OutletLocation.js';
import PincodeAssignment from '../models/PincodeAssignment.js';

const router = express.Router();

// Outlet Locations
router.post('/locations', async (req, res) => {
  try {
    const outlet = new OutletLocation({ name: req.body.name });
    await outlet.save();
    res.status(201).json(outlet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/locations', async (req, res) => {
  try {
    const outlets = await OutletLocation.find();
    res.json(outlets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/locations/:id', async (req, res) => {
  try {
    await OutletLocation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Outlet location deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pincode Assignments
router.post('/pincodes', async (req, res) => {
  try {
    const assignment = new PincodeAssignment({ outlet: req.body.outlet, pincode: req.body.pincode });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/pincodes', async (req, res) => {
  try {
    const assignments = await PincodeAssignment.find().populate('outlet');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/pincodes/:id', async (req, res) => {
  try {
    await PincodeAssignment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pincode deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 