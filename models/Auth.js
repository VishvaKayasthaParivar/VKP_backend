const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
  membership: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership' },
});

authSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Auth', authSchema);
