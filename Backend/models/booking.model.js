const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a user']
    },
    serviceName: {
        type: String,
        required: [true, 'Service name is required']
    },
    serviceId: {
        type: String, // e.g., 'residential', 'commercial'
        required: [true, 'Service ID is required']
    },
    date: {
        type: Date,
        required: [true, 'Booking date is required']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    address: {
        type: String,
        required: [true, 'Address is required for service']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    projectType: {
        type: String,
        enum: ['Residential', 'Commercial', 'Renovation', 'Other'],
        default: 'Other'
    },
    budget: {
        type: String
    },
    alternateContact: {
        type: String
    },
    notes: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
