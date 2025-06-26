import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  outlet: { type: mongoose.Schema.Types.ObjectId, ref: 'OutletLocation', required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  note: { type: String },
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense; 