const Booking = require('../models/booking.model');
const sendEmail = require('../utils/email.service');
const User = require('../models/user.model');

exports.createBooking = async (req, res) => {
    try {
        const { serviceName, serviceId, date, address, notes, phone, projectType, budget, alternateContact, name } = req.body;

        const newBooking = await Booking.create({
            user: req.user.id,
            serviceName,
            serviceId,
            name,
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

        // Send Admin Notification
        const adminEmail = "mdsadiksadik464@gmail.com";
        const adminMessage = `New Booking Request!\n\nUser: ${user.name} (${user.email})\nService: ${serviceName}\nType: ${projectType}\nDate: ${new Date(date).toLocaleDateString()}\nBudget: ${budget}\nPhone: ${phone}\nAddress: ${address}\n\nPlease check the admin panel for more details.`;

        try {
            await sendEmail({
                email: adminEmail,
                subject: `📅 New Booking: ${serviceName} - ${user.name}`,
                message: adminMessage
            });
            console.log(`✅ Admin notification sent to ${adminEmail}`);
        } catch (adminErr) {
            console.error('Admin email send failed:', adminErr);
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

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'name email').sort({ createdAt: -1 });

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

exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

        if (!booking) {
            return res.status(404).json({
                status: 'fail',
                message: 'No booking found with that ID'
            });
        }

        const user = await User.findById(booking.user);
        const message = `Dear ${user.name},\n\nThe status of your booking for ${booking.serviceName} has been updated to: ${status.toUpperCase()}.\n\nIf you have any questions, please contact us.\n\nBest regards,\nModsser Enterprises`;

        try {
            await sendEmail({
                email: user.email,
                subject: `Booking Status Update: ${status.toUpperCase()}`,
                message
            });
        } catch (err) {
            console.error('Status update email failed:', err);
        }

        res.status(200).json({
            status: 'success',
            data: {
                booking
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
