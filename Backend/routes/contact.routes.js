const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const rateLimit = require('express-rate-limit');

// Rate limiter: maximum 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        message: "Too many requests from this IP, please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiter specifically to the save route
router.post('/save', contactLimiter, contactController.saveContact);

module.exports = router;
