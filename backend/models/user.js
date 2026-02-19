const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // --- Core Authentication Fields ---
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        required: true, 
        enum: ['student', 'counsellor', 'parent'] 
    },
    
    // --- Registration Date ---
    registeredAt: { 
        type: Date, 
        default: Date.now 
    },

    // --- ⭐ NEW: Growth Dashboard Fields ---
    assessmentResult: {
        type: Object, // Will store the results object from the quiz
        default: null
    },
    savedColleges: {
        type: [String], // An array of college names
        default: []
    },
    appliedJobs: {
        type: [String], // An array of job titles
        default: []
    },
    bookedSessions: {
        type: [String], // An array of mentor names
        default: []
    }
});

module.exports = mongoose.model('User', UserSchema);