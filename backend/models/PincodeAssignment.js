import mongoose from 'mongoose';

const pincodeAssignmentSchema = new mongoose.Schema({
  outlet: { type: mongoose.Schema.Types.ObjectId, ref: 'OutletLocation', required: true },
  pincode: { type: String, required: true }
});

const PincodeAssignment = mongoose.model('PincodeAssignment', pincodeAssignmentSchema);
export default PincodeAssignment; 