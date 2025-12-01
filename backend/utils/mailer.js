const nodemailer = require('nodemailer');

// --- 🚀 OPTIMIZED GMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Connect directly to host
    port: 465,              // Use Secure SSL port (Faster handshake than 587 sometimes)
    secure: true,           // Use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // ⚡ PERFORMANCE FIXES:
    family: 4,              // Force IPv4 (Prevents the 40s-2min delay)
    pool: true,             // Keep connection open (Reuses connection for faster sending)
    maxConnections: 1,      // Be gentle with Gmail's limits
    rateLimit: 5            // Send max 5 emails per second
});

// 1. Verification Email
const sendVerificationEmail = async (email, token) => {
    // ⚠️ IMPORTANT: When testing locally, change this to https://future-fit-backend-fcmi.onrender.com
    // When deploying, change back to https://future-fit.vercel.app
    const verificationUrl = `http://127.0.0.1:3000/index.html#?verified=true&token=${token}`;

    const mailOptions = {
        from: `"Future-Fit Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Future-Fit: Verify Your Email',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #667eea;">Welcome to Future-Fit!</h2>
                <p>Please click the button below to verify your email address.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" style="background-color: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify My Email</a>
                </div>
                <p style="color: #666; font-size: 12px;">Link: ${verificationUrl}</p>
            </div>
        `
    };

    // Send with detailed error logging
    try {
        console.log(`🔹 Connecting to Gmail (IPv4) for: ${email}...`);
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully!`);
    } catch (error) {
        console.error(`❌ Nodemailer Error: ${error.message}`);
        throw error; // Pass error to auth.js to handle
    }
};

// 2. Password Reset Email
const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `https://future-fit.vercel.app/reset-password.html?token=${token}`;

    const mailOptions = {
        from: `"Future-Fit Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Future-Fit: Password Reset Request',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #e74c3c;">Reset Password</h2>
                <p>Click the button below to reset your password.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #e74c3c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Password reset email sent successfully.`);
    } catch (error) {
        console.error(`❌ Nodemailer Error: ${error.message}`);
        throw error;
    }
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};