const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Submitted', 'Reviewed', 'Interviewed', 'Hired', 'Rejected'],
    default: 'Submitted',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resume: {
    type: String, // Storing filename or path for now
    required: false,
  },
  coverLetter: {
    type: String, // Storing filename or path for now
    required: false,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('JobApplication', JobApplicationSchema);
