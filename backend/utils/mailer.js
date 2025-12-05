const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Verification Email
const sendVerificationEmail = async (email, token) => {
    // const verificationUrl = `http://localhost:5000/api/auth/verify?token=${token}`;
    const verificationUrl = `https://future-fit-backend-fcmi.onrender.com/api/auth/verify?token=${token}`;

    console.log(`🔹 Sending verification email to: ${email}...`);
    
    try {
        const data = await resend.emails.send({
            from: 'Future-Fit <onboarding@resend.dev>',
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
        
        console.log(`✅ Email sent successfully! ID: ${data.id}`);
    } catch (error) {
        console.error('❌ Resend Error:', error);
        throw error;
    }
};

// 2. Password Reset Email
const sendPasswordResetEmail = async (email, token) => {
    // const resetUrl = `http://localhost:3000/reset-password.html?token=${token}`;
    const resetUrl = `https://future-fit.vercel.app/reset-password.html?token=${token}`;

    console.log(`🔹 Sending password reset email to: ${email}...`);
    
    try {
        const data = await resend.emails.send({
            from: 'Future-Fit <onboarding@resend.dev>',
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
                    </div>
                </div>
            `
        });
        
        console.log(`✅ Password reset email sent! ID: ${data.id}`);
    } catch (error) {
        console.error('❌ Resend Error:', error);
        throw error;
    }
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};
