const mongoose = require('mongoose');

const businessAccountSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone:    { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('BusinessAccount', businessAccountSchema);
