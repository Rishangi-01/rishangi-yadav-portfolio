const Certification = require('../models/Certification');

const getCertifications = async (_req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: certifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch certifications' });
  }
};

const createCertification = async (req, res) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json({ success: true, message: 'Certification created', data: certification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Failed to create certification' });
  }
};

const updateCertification = async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.status(200).json({ success: true, message: 'Certification updated', data: certification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Failed to update certification' });
  }
};

const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.status(200).json({ success: true, message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to delete certification' });
  }
};

module.exports = { getCertifications, createCertification, updateCertification, deleteCertification };