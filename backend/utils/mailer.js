// Resend Email Service - Works with Render (No SMTP blocking)
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const SENDER_EMAIL = 'onboarding@resend.dev'; // Resend's test email (works immediately)

// 1. Verification Email
const sendVerificationEmail = async (email, token) => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const verificationUrl = `${backendUrl}/api/auth/verify?token=${token}`;

    console.log(`📧 Sending verification email to: ${email}`);
    console.log(`🔗 Verification URL: ${verificationUrl}`);

    const { data, error } = await resend.emails.send({
        from: SENDER_EMAIL,
        to: email,
        subject: 'Future-Fit: Verify Your Email',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #667eea; text-align: center;">Welcome to Future-Fit!</h2>
                    <p style="color: #555; font-size: 16px;">Please click the button below to verify your email address and activate your account.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" style="background-color: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">Verify My Email</a>
                    </div>
                    <p style="color: #999; font-size: 12px; text-align: center;">Link: ${verificationUrl}</p>
                </div>
            </div>
        `
    });

    if (error) {
        throw new Error(error.message);
    }

    console.log(`✅ Verification email sent successfully to ${email}`);
};

// 2. Password Reset Email
const sendPasswordResetEmail = async (email, token) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5500';
    const resetUrl = `${frontendUrl}/reset-password.html?token=${token}`;

    console.log(`📧 Sending password reset email to: ${email}`);
    console.log(`🔗 Reset URL: ${resetUrl}`);

    const { data, error } = await resend.emails.send({
        from: SENDER_EMAIL,
        to: email,
        subject: 'Future-Fit: Password Reset',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #e74c3c; text-align: center;">Reset Password</h2>
                    <p style="color: #555; font-size: 16px;">We received a request to reset your password. Click below to proceed.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #e74c3c; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">Reset Password</a>
                    </div>
                    <p style="color: #999; font-size: 12px; text-align: center;">This link will expire in 1 hour.</p>
                </div>
            </div>
        `
    });

    if (error) {
        throw new Error(error.message);
    }

    console.log(`✅ Password reset email sent successfully to ${email}`);
};

// Test connection
const verifyConnection = async () => {
    if (!process.env.RESEND_API_KEY) {
        console.error('❌ RESEND_API_KEY not found');
        return false;
    }
    console.log('✅ Resend email service configured');
    return true;
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
    verifyConnection
};