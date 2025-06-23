import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Order Pending', 'Order Accepted', 'Preparing Food', 'Delivery On Way', 'Delivered', 'Order Rejected'],
    default: 'Order Pending'
  },
  deliveryBoy: {
    type: String,
    default: ''
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `${year}${month}${day}${random}`;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order; 