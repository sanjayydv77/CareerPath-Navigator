const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// @route   POST /api/auth/signup
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists. Please login.' });
        }

        // Create new user
        user = new User({
            name,
            email,
            password,
            role
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user
        await user.save();
        console.log("✅ User registered:", email);

        // Create JWT token for immediate login
        const payload = { user: { id: user.id, name: user.name, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ 
                msg: 'Registration successful! You are now logged in.',
                token, 
                user: { id: user.id, name: user.name, email: user.email, role: user.role } 
            });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error. Please try again.' });
    }
});

// @route   POST /api/auth/signin
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found. Please sign up first.' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect password. Please try again.' });
        }

        // Create JWT token
        const payload = { user: { id: user.id, name: user.name, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            console.log("✅ User logged in:", email);
            res.json({ 
                msg: 'Login successful!',
                token, 
                user: { id: user.id, name: user.name, email: user.email, role: user.role } 
            });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error. Please try again.' });
    }
});

module.exports = router;