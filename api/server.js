const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Import routes
app.use('/api/users', require('./../routes/userRoutes'));
app.use('/api/templates', require('./../routes/templateRoutes'));

// Database connection helper for serverless environments
let isConnected = false;
async function connectToDB() {
  if (isConnected) return;
  try {
    await mongoose.connect("mongodb+srv://codadhyay_image_edit:pfXB9Sa0o5awywl4@image-edit.vy1zqit.mongodb.net/image-edit", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,       // Increase connection timeout to 30 seconds
      serverSelectionTimeoutMS: 30000 // Wait up to 30 seconds for server selection
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

// Setup server
(async () => {
  try {
    await connectToDB();
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (err) {
    process.exit(1);
  }
})();

module.exports = app;
