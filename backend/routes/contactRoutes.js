const express = require('express');
const router = express.Router();
const { submitContact, getContacts, markContactAsRead, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', submitContact);
router.get('/', protect, getContacts);
router.patch('/:id/read', protect, markContactAsRead);
router.delete('/:id', protect, deleteContact);

module.exports = router;
