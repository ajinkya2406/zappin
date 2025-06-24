import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['Customer', 'Delivery Boy'], required: true },
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  flat: { type: String },
  building: { type: String },
  street: { type: String },
  landmark: { type: String },
  pincode: { type: String },
  adhar: { type: String },
  adharFile: { type: String }, // store file path
  passportPhoto: { type: String }, // store file path
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User; 