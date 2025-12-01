const nodemailer = require('nodemailer');

// --- UPDATED CONFIGURATION FOR RENDER ---
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

// 2. Verification Email Function
const sendVerificationEmail = async (email, token) => {
    // Ensure this points to your live Vercel site
    const verificationUrl = `https://future-fit.vercel.app/index.html?verified=true&token=${token}`;

    const mailOptions = {
        from: `"Future-Fit Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Future-Fit: Verify Your Email',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Welcome to Future-Fit!</h2>
                <p>Please click the link below to verify your email address:</p>
                <a href="${verificationUrl}" style="background-color: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>Or copy this link: ${verificationUrl}</p>
            </div>
        `
    };

    try {
        console.log(`Attempting to send email to ${email}...`);
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to ${email}`);
    } catch (error) {
        console.error(`❌ Email Error: ${error.message}`);
        // We throw the error so the auth route knows it failed
        throw error;
    }
};

// 3. Password Reset Email Function
const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `https://future-fit.vercel.app/reset-password.html?token=${token}`;

    const mailOptions = {
        from: `"Future-Fit Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Future-Fit: Reset Password',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Reset Your Password</h2>
                <p>Click below to reset your password:</p>
                <a href="${resetUrl}" style="background-color: #e74c3c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>Link: ${resetUrl}</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`);
    } catch (error) {
        console.error(`❌ Reset Email Error: ${error.message}`);
        throw error;
    }
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};