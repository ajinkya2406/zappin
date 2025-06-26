import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

// POST /api/expenses - add a new expense
router.post('/', async (req, res) => {
  try {
    const { outlet, amount, type, date, note } = req.body;
    if (!outlet || !amount || !type || !date) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }
    const expense = new Expense({ outlet, amount, type, date, note });
    await expense.save();
    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/expenses - list all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().populate('outlet');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 