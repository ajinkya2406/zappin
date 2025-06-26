import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  productType: { type: String, required: true },
  productName: { type: String, required: true },
  productCode: { type: String },
  strikedPrice: { type: Number },
  displayPrice: { type: Number },
  availableInOutlet: { type: String },
  productSequence: { type: String },
  productDescription: { type: String },
  offerAvailable: { type: String },
  recommended: { type: String },
  addLink: { type: String },
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema); 