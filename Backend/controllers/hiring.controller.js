const JobApplication = require('../models/job.model');
const path = require('path');
const fs = require('fs');

// Apply for a job
exports.applyForJob = async (req, res) => {
    try {
        const { name, email, phone, position } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Resume is required' });
        }

        const resumePath = req.file.path; // Multer saves the file path here

        const newApplication = new JobApplication({
            name,
            email,
            phone,
            position,
            resume: resumePath
        });

        await newApplication.save();

        res.status(201).json({
            message: 'Application submitted successfully',
            application: newApplication
        });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all applications (Admin only)
exports.getApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find().sort({ appliedAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update application status
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const application = await JobApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Status updated', application });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
