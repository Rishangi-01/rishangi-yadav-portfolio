const Education = require('../models/Education');

const getEducations = async (req, res) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch education' });
  }
};

const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, message: 'Education created', data: education });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Failed to create education' });
  }
};

const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.status(200).json({ success: true, message: 'Education updated', data: education });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Failed to update education' });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.status(200).json({ success: true, message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to delete education' });
  }
};

module.exports = { getEducations, createEducation, updateEducation, deleteEducation };
