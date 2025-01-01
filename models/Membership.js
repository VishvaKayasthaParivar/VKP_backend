const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const membershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  paymentInfo: {
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true, unique: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  receiptId: { type: String, default: () => uuidv4(), unique: true },
});

module.exports = mongoose.model('Membership', membershipSchema);
