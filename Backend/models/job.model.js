const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    enum: ['Civil Engineer', 'Architect', 'Site Supervisor', 'Laborer', 'Other'],
    default: 'Other'
  },
  resume: {
    type: String, // Path to the uploaded file
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Rejected', 'Accepted'],
    default: 'Pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
