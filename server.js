const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const { testConnection } = require('./config/database');
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:8081',
      'http://localhost:19006',
      'exp://192.168.100.10:8081',
      'http://localhost:5000',  
      'http://localhost:19000', 
      'http://localhost:19001', 
      'http://localhost:19002'  
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('CORS blocked for origin:', origin);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    console.log('CORS allowed for origin:', origin);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['set-cookie'],
  optionsSuccessStatus: 200
};

// Test route to check server accessibility
app.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    status: 'success',
    message: 'Server is running!',
    time: new Date().toISOString()
  });
});

// Apply CORS with options
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Enhanced request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Origin:', req.headers.origin);
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test DB
testConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Root
app.get('/', (req, res) => {
  res.json({ message: 'Notes API running', timeStamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
