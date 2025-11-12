// utils/mailer.js (Complete File - WITH Password Reset Function)

const nodemailer = require('nodemailer');

// 1. Create the Transporter (No changes here)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your 'future-fit@gmail.com'
        pass: process.env.EMAIL_PASS  // Your 16-character App Password
    }
});

// 2. Verification Email Function (No changes here)
const sendVerificationEmail = async (email, token) => {
    
    const verificationUrl = `http://localhost:5000/api/auth/verify?token=${token}`;

    const mailOptions = {
        from: `"Future-Fit Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Future-Fit: Please Verify Your Email Address',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Welcome to Future-Fit!</h2>
                <p>Please click the link below to verify your email address:</p>
                <p style="text-align: center;">
                    <a href="${verificationUrl}" 
                       style="background-color: #4CAF50; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block; border-radius: 8px; font-size: 16px;">
                       Verify My Email
                    </a>
                </p>
                <p>Link: <a href="${verificationUrl}">${verificationUrl}</a></p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent successfully to ${email}`);
    } catch (error) {
        console.error(`Error sending verification email: ${error.message}`);
        throw error;
    }
};


// --- ⭐ 3. NEW: Password Reset Email Function ---
const sendPasswordResetEmail = async (email, token) => {
    
    // This link points to a NEW frontend page we will create: 'reset-password.html'
    const resetUrl = `http://127.0.0.1:3000/reset-password.html?token=${token}`;

    const mailOptions = {
        from: `"Future-Fit Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Future-Fit: Password Reset Request',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Password Reset Request</h2>
                <p>You are receiving this email because you (or someone else) requested a password reset for your account.</p>
                <p>Please click the button below to set a new password:</p>
                <p style="text-align: center;">
                    <a href="${resetUrl}" 
                       style="background-color: #FFC107; color: #333; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block; border-radius: 8px; font-size: 16px;">
                       Reset Your Password
                    </a>
                </p>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                <p>Link: <a href="${resetUrl}">${resetUrl}</a></p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent successfully to ${email}`);
    } catch (error) {
        console.error(`Error sending password reset email: ${error.message}`);
        throw error;
    }
};


// Make BOTH functions available to other files
module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};