const mongoose=require("mongoose")

const ContactRequestSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    status: {
      type: String,
      enum: ['Pending', 'Attended'],
      default: 'Pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('ContactRequest', ContactRequestSchema);