const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // For handling multipart/form-data
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const authMiddleware = require('./middleware/auth'); // Import auth middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Set up multer for file uploads
const upload = multer(); // No destination, files handled in memory

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/pgrkam_insights')
  .then(() => console.log('MongoDB Local Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // Add auth routes
app.use('/api/jobs', upload.any(), jobRoutes); // Apply multer middleware only to job routes that handle files

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Node.js Backend for PGRKAM Insight is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
