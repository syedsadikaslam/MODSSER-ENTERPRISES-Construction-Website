const express = require('express');
const bookingController = require('../controllers/booking.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

// All booking routes needed to be protected
router.use(protect);

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getUserBookings);
router.get('/admin', protect, restrictTo('admin'), bookingController.getAllBookings);

module.exports = router;
