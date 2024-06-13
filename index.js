const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
require('dotenv').config();
const connectDB = require("./config/db");
const app = express();
const bodyparser = require("body-parser");

// JSON parsing middleware
app.use(express.json());

  // List of allowed origins for CORS
  const allowedOrigins = [
    "http://localhost:5173",
    "https://gces-app-fe1.netlify.app",
  ];

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies to be sent
  };

  app.use(cors(corsOptions));
  app.use(bodyparser.json());

// Middleware to set response headers for CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});





const PORT = process.env.PORT || 4001;
const HOSTNAME = process.env.HOSTNAME ||" 0.0.0.0";
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server started at http://${HOSTNAME}:${PORT}`);
  });
