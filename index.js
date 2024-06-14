const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

// Connect to MongoDB
connectDB();

// List of allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://urlshorteb-app-2.netlify.app",
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent
};

// Middleware
app.use(express.json()); // JSON parsing middleware
app.use(cors(corsOptions)); // Enable CORS with options

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Start server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server started at http://${HOSTNAME}:${PORT}`);
});
