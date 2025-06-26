import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  percentage: { type: Number, required: true },
  description: { type: String },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  image: { type: String }, // file path
}, { timestamps: true });

// Automatically set status to 'inactive' for expired offers on find/findOne
function updateExpiredStatus(docs) {
  if (!docs) return;
  const now = new Date();
  if (Array.isArray(docs)) {
    docs.forEach(doc => {
      if (doc.expiryDate && doc.expiryDate < now && doc.status !== 'inactive') {
        doc.status = 'inactive';
      }
    });
  } else {
    if (docs.expiryDate && docs.expiryDate < now && docs.status !== 'inactive') {
      docs.status = 'inactive';
    }
  }
}
offerSchema.post('find', function(docs) {
  updateExpiredStatus(docs);
});
offerSchema.post('findOne', function(doc) {
  updateExpiredStatus(doc);
});

const Offer = mongoose.model('Offer', offerSchema);
export default Offer; 