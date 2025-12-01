// backend/routes/auth.js
// COMPLETE & FIXED FILE

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// ✅ FIX 1: Ensure this matches your filename exactly (lowercase 'u')
const User = require('../models/user'); 

// Import email utilities
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/mailer');

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', async (req, res) => {
    console.log("🔹 1. Signup Request Received:", req.body.email);

    const { name, email, password, role } = req.body;

    // 1. Basic Validation
    if (!name || !email || !password || !role) {
        console.log("❌ Missing fields");
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    try {
        // 2. Check if user exists
        let user = await User.findOne({ email: email });
        if (user) {
            console.log("❌ User already exists");
            return res.status(400).json({ msg: 'User with this email already exists.' });
        }

        // 3. Create User Object
        user = new User({
            name,
            email,
            password,
            role,
            verificationToken: crypto.randomBytes(20).toString('hex'),
            isVerified: false // Force false initially
        });

        // 4. Hash Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

     // 5. Save to Database
        await user.save();
        console.log("✅ 2. User Saved to Database");

        // 6. Send Email in BACKGROUND (Fire and Forget)
        // We removed 'await' so the code continues immediately
        sendVerificationEmail(user.email, user.verificationToken)
            .then(() => console.log("✅ Email sent in background"))
            .catch(err => console.error("❌ Background Email Error:", err.message));

        // 7. Send Success Response IMMEDIATELY
        res.status(201).json({ 
            msg: 'Registration successful! Please check your email to verify your account.' 
        });

    } catch (err) {
        console.error("❌ SERVER ERROR:", err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/auth/verify
// @desc    Verify user email with token
router.get('/verify', async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) return res.status(400).send('Verification failed: No token provided.');

        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(400).send('Verification failed: Token is invalid or has expired.');

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        // ✅ FIX 2: Ensure this points to your LIVE Vercel URL
        // CHANGE THIS LINK if your frontend is deployed elsewhere
        const frontendURL = 'https://future-fit.vercel.app'; 
        
        res.redirect(`${frontendURL}/index.html?verified=true`);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during verification.');
    }
});

// @route   POST /api/auth/signin
// @desc    Sign in a user
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    try {
        // Check for user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials. User not found.' });
        }

        // Check verification
        if (!user.isVerified) {
            return res.status(401).json({ 
                msg: 'Account not verified. Please check your email.' 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials. Password incorrect.' });
        }

        // Create Token
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/auth/resend
// @desc    Resend verification email
router.post('/resend', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ msg: 'Please provide an email.' });

        const user = await User.findOne({ email });

        if (!user) return res.json({ msg: 'If account exists, email sent.' });
        if (user.isVerified) return res.status(400).json({ msg: 'Account already verified.' });

        user.verificationToken = crypto.randomBytes(20).toString('hex');
        await user.save();
        
        await sendVerificationEmail(user.email, user.verificationToken);
        res.json({ msg: 'New verification link sent.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.json({ msg: 'If email exists, reset link sent.' });

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour

        await user.save();
        await sendPasswordResetEmail(user.email, resetToken);

        res.json({ msg: 'Reset link sent to your email.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password via token
router.post('/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ msg: 'Token invalid or expired.' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();
        res.json({ msg: 'Password reset successful. Please login.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;