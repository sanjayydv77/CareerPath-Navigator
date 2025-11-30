// routes/auth.js (Complete File - WITH Resend & Forgot Password)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const crypto = require('crypto');   
const jwt = require('jsonwebtoken'); 
const User = require('../models/user'); 

// --- (MODIFIED) Import BOTH mailer functions ---
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/mailer');

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists.' });
        }
        user = new User({
            name,
            email,
            password,
            role,
            verificationToken: crypto.randomBytes(20).toString('hex')
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
        // Send verification email
        await sendVerificationEmail(user.email, user.verificationToken);
        
        res.status(201).json({ 
            msg: 'Registration successful! Please check your email to verify your account.' 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/auth/verify
// @desc    Verify user email with token
router.get('/verify', async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) {
            return res.status(400).send('Verification failed: No token provided.');
        }

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).send('Verification failed: Token is invalid or has expired.');
        }

        user.isVerified = true;
        user.verificationToken = undefined; 
        await user.save();

        // Redirects to your frontend (Live Server port)
        res.redirect('http://127.0.0.1:3000/index.html?verified=true'); 

    } catch (err)
 {
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
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials. User not found.' });
        }
        if (!user.isVerified) {
            return res.status(401).json({ 
                msg: 'Account not verified. Please check your email for a verification link.' 
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials. Password incorrect.' });
        }
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

// --- ⭐ NEW ROUTE 1: Resend Verification Email ---
// @route   POST /api/auth/resend
// @desc    Resend verification email
router.post('/resend', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: 'Please provide an email.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ msg: 'If an account with that email exists, a new verification link has been sent.' });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: 'This account is already verified. Please try logging in.' });
        }

        user.verificationToken = crypto.randomBytes(20).toString('hex');
        await user.save();
        await sendVerificationEmail(user.email, user.verificationToken);

        res.json({ msg: 'A new verification link has been sent to your email.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- ⭐ NEW ROUTE 2: Forgot Password ---
// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: 'Please provide an email.' });
        }
        
        const user = await User.findOne({ email });

        // Always send a success message for security, even if user doesn't exist
        if (!user) {
            return res.json({ msg: 'If your email is registered, you will receive a password reset link.' });
        }

        // Create reset token (expires in 1 hour)
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Send the password reset email
        await sendPasswordResetEmail(user.email, resetToken);

        res.json({ msg: 'If your email is registered, you will receive a password reset link.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- ⭐ NEW ROUTE 3: Reset Password ---
// @route   POST /api/auth/reset-password
// @desc    Reset a user's password using a token
router.post('/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ msg: 'Please provide a token and a new password.' });
        }

        // Find user by token AND make sure token hasn't expired
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() } // $gt means "greater than"
        });

        if (!user) {
            return res.status(400).json({ msg: 'Password reset token is invalid or has expired.' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        // Clear the reset token fields
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        res.json({ msg: 'Password has been reset successfully! You can now log in.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;