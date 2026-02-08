const Booking = require('../models/booking.model');
const sendEmail = require('../utils/email.service');
const User = require('../models/user.model');

exports.createBooking = async (req, res) => {
    try {
        const { serviceName, serviceId, date, address, notes, phone, projectType, budget, alternateContact } = req.body;

        const newBooking = await Booking.create({
            user: req.user.id,
            serviceName,
            serviceId,
            date,
            address,
            phone,
            projectType,
            budget,
            alternateContact,
            notes
        });

        // Send Email Notification
        const user = await User.findById(req.user.id);
        const message = `Dear ${user.name},\n\nThank you for booking our ${serviceName} service.\n\nProject Type: ${projectType}\nDate: ${new Date(date).toLocaleDateString()}\nContact: ${phone}\n\nWe have received your request and will get back to you shortly to confirm the details.\n\nBest regards,\nModsser Enterprises`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Service Booking Confirmation',
                message
            });
        } catch (err) {
            console.error('Email send failed:', err);
            // Don't fail the booking if email fails, just log it
        }

        res.status(201).json({
            status: 'success',
            data: {
                booking: newBooking
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: {
                bookings
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
