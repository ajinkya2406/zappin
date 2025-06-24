import mongoose from 'mongoose';

const outletLocationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

const OutletLocation = mongoose.model('OutletLocation', outletLocationSchema);
export default OutletLocation; 