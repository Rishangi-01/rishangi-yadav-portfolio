const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    companyUrl: { type: String, default: '' },
    logo: { type: String, default: '' },
    location: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: '' },
    current: { type: Boolean, default: false },
    points: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
