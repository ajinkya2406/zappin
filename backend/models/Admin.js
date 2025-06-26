import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firmName: { type: String, default: 'Your Firm Name' },
  firmMobile: { type: String, default: '' },
  firmEmail: { type: String, default: '' },
  firmAddress: { type: String, default: '' },
});

AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  // Only hash if not already a bcrypt hash
  if (!this.password.startsWith('$2')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default mongoose.model('Admin', AdminSchema); 