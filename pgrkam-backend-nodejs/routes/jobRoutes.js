const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');
const auth = require('../middleware/auth'); // Import auth middleware

// POST endpoint for job application submission
router.post('/apply', auth, async (req, res) => {
  try {
    console.log('Received job application request.');
    // Multer stores file data in req.files or req.file depending on upload.single/array/any()
    // If using upload.any(), files are in req.files

    const { jobId, jobTitle, name, email, phone } = req.body;

    // For simplicity, we'll just store the original filenames for now.
    // In a real application, you'd save these files to a cloud storage (e.g., AWS S3) or a dedicated file system,
    // and store the paths/URLs in the database.
    const resumeFile = req.files && req.files.find(file => file.fieldname === 'resumeFile');
    const coverLetterFile = req.files && req.files.find(file => file.fieldname === 'coverLetterFile');

    const newApplication = new JobApplication({
      userId: req.user.id, // Add userId from authenticated user
      jobId,
      jobTitle,
      name,
      email,
      phone,
      resume: resumeFile ? resumeFile.originalname : undefined,
      coverLetter: coverLetterFile ? coverLetterFile.originalname : undefined,
    });

    await newApplication.save();
    console.log('Job application saved successfully:', newApplication);
    res.status(201).json({ message: 'Job application submitted successfully', application: newApplication });
  } catch (error) {
    console.error('Error submitting job application:', error);
    res.status(400).json({ error: 'Error submitting job application', details: error.message });
  }
});

// GET endpoint for fetching job applications for the logged-in user
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await JobApplication.find({ userId: req.user.id });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
