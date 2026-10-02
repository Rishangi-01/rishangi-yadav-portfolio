const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certification', certificationSchema);