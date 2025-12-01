const nodemailer = require('nodemailer');

// Standard Gmail Transport (Reliable)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your gmail
        pass: process.env.EMAIL_PASS  // Your 16-char App Password
    }
});

// 1. Verification Email
const sendVerificationEmail = async (email, token) => {
    // IMPORTANT: This link points to your Vercel Frontend
    // When testing locally, clicking this will open the live site (which is fine)
    // OR you can change this to http://127.0.0.1:5500 if using Live Server
    const verificationUrl = `https://future-fit.vercel.app/index.html?verified=true&token=${token}`;

    const mailOptions = {
        from: `"Future-Fit Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Future-Fit: Verify Your Email',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #667eea;">Welcome to Future-Fit!</h2>
                <p>Please click the button below to verify your email address and activate your account.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" style="background-color: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify My Email</a>
                </div>
                <p style="color: #666; font-size: 12px;">If the button doesn't work, copy this link: <br> ${verificationUrl}</p>
            </div>
        `
    };

    // We use 'await' to ensure it sends before continuing
    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent successfully to ${email}`);
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
                <p>You requested a password reset. Click the button below to proceed.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #e74c3c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                <p style="color: #666; font-size: 12px;">Link expires in 1 hour.</p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};