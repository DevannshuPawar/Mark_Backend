const mongoose = require('mongoose');

const businessListingSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city:   { type: String, required: true },
    state:  { type: String, required: true },
    zip:    { type: String }
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  logoUrl:     { type: String, required: true },
  description: { type: String, required: true },
  images:      [{ type: String, required: true }],
  website:     { type: String },
  mapLocation: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('BusinessListing', businessListingSchema);
