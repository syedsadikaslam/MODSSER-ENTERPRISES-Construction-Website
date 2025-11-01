const express = require('express');
const router = express.Router();
const { saveContact } = require('../controllers/contactController.js');

// ✅ Route for saving contact + sending email
router.post('/save', saveContact);

module.exports = router;
