// models/User.js (Corrected)

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
    
    // --- Email Verification Fields ---
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    verificationToken: { 
        type: String 
    }, 
    
    // --- Initial Data Recording ---
    schoolId: { 
        type: String 
    },
    assessmentData: { 
        type: mongoose.Schema.Types.Mixed, 
        default: null 
    },
    registeredAt: { 
        type: Date, 
        default: Date.now 
    },

    // --- NEW: Fields for Password Reset ---
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    }
});

module.exports = mongoose.model('User', UserSchema);