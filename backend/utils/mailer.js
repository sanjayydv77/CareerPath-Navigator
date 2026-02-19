// --- 🚀 SENDGRID EMAIL SERVICE (PRODUCTION-READY) ---
// SendGrid is reliable with cloud hosting providers (Render, Heroku, etc.)
// No SMTP timeouts, fast delivery, 100 free emails/day
const sgMail = require('@sendgrid/mail');

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Sender email (must be verified in SendGrid)
const SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL || 'futurfit2@gmail.com';

// 1. Verification Email
const sendVerificationEmail = async (email, token) => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const verificationUrl = `${backendUrl}/api/auth/verify?token=${token}`;

    console.log(`📧 Sending verification email to: ${email}`);
    console.log(`🔗 Verification URL: ${verificationUrl}`);

    const msg = {
        to: email,
        from: {
            email: SENDER_EMAIL,
            name: 'Future-Fit Team'
        },
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
    };

    await sgMail.send(msg);
    console.log(`✅ Verification email sent successfully to ${email}`);
};

// 2. Password Reset Email
const sendPasswordResetEmail = async (email, token) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5500';
    const resetUrl = `${frontendUrl}/reset-password.html?token=${token}`;

    console.log(`📧 Sending password reset email to: ${email}`);
    console.log(`🔗 Reset URL: ${resetUrl}`);

    const msg = {
        to: email,
        from: {
            email: SENDER_EMAIL,
            name: 'Future-Fit Team'
        },
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
    };

    await sgMail.send(msg);
    consSendGrid connection
const verifyConnection = async () => {
    if (!process.env.SENDGRID_API_KEY) {
        console.error('❌ SENDGRID_API_KEY not found in environment variables');
        return false;
    }
    
    console.log('✅ SendGrid API Key configured');
    console.log(`📧 Sender email: ${SENDER_EMAIL}`);
    return true; catch (error) {
        console.error('❌ Email server connection failed:', error.message);
        return false;
    }
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
    verifyConnection
};