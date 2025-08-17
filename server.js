const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Pentru React Native
app.use(express.json()); // Pentru a parsa JSON din request-uri
app.use(express.urlencoded({ extended: true }));

//for testing
app.get("/", (req,res) => {
res.json({message: "Notes API is running", timeStamp: new Date().toISOString()})
});

// Routes (le vom adăuga după)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

