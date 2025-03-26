const mongoose = require('mongoose');

const HelpRequestSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  assistanceType: String,
  message: String,
  status: {
    type: String,
    enum: ['Pending', 'Help Granted'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HelpRequest', HelpRequestSchema);