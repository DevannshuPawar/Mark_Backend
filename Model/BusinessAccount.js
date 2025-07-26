const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone:    { type: String, required: true },

  organizationName: { type: String },
  address: {
    street: { type: String },
    city:   { type: String },
    state:  { type: String },
    zip:    { type: String }
  },
  contact: {
    phone: { type: String },
    email: { type: String }
  },
  logoUrl:     { type: String },
  description: { type: String },
  images:      [{ type: String }],
  website:     { type: String },
  mapLocation: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);
