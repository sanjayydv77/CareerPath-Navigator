// server.js (Complete File)

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- Middleware ---
// Enable CORS for frontend connection
const allowedOrigins = [
    'http://localhost:5500',
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    process.env.FRONTEND_URL // Your Netlify URL
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, or curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Body parser to accept JSON data from frontend forms
app.use(express.json()); 

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => console.error('❌ DB Connection Error:', err));

// --- Routes ---
app.get('/', (req, res) => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5500';
    
    res.json({
        status: 'Career Counseling API Running...',
        version: '3.0-DYNAMIC-URLS',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        verificationUrl: `${backendUrl}/api/auth/verify`,
        resetUrl: `${frontendUrl}/reset-password.html`
    });
});

// Connect the authentication routes
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/data', require('./routes/data'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));