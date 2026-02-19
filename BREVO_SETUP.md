# Brevo Email Setup - SIMPLE & FREE (3 Minutes)

## Why Brevo?
✅ Truly FREE - 300 emails/day
✅ NO credit card needed
✅ Works perfectly with Render
✅ Super simple setup

---

## Step 1: Create Account (1 minute)

1. Go to: **https://www.brevo.com/** (or **https://app.brevo.com/account/register**)
2. Click **Sign up free**
3. Enter:
   - Email: `futurfit2@gmail.com` (or any email)
   - Password: Create a password
4. Click **Sign up**
5. Check your email inbox and click verification link

---

## Step 2: Get SMTP Credentials (1 minute)

After logging in:

1. Click your name (top right) → **SMTP & API**
2. Under **SMTP**, you'll see:
   - **Login**: (your email address)
   - **SMTP Key**: Click **Generate a new SMTP key**
3. **Copy both**:
   - Login: `futurfit2@gmail.com`
   - SMTP Key: `xyk...` (long password)

---

## Step 3: Add to Render (1 minute)

1. Go to: **https://dashboard.render.com/**
2. Click **future-fit-backend-jil4**
3. Click **Environment** tab
4. Add these 2 variables:

```
BREVO_SMTP_USER = futurfit2@gmail.com
BREVO_SMTP_KEY = your_smtp_key_here
EMAIL_USER = futurfit2@gmail.com
```

5. Click **Save Changes**
6. Wait 2-3 minutes for Render to redeploy

---

## Step 4: Test

1. Go to: **https://futurefit-web.netlify.app/**
2. Click **Sign Up**
3. Register with a real email
4. Email arrives in **2-5 seconds**! ⚡

---

## Troubleshooting

### Check Render Logs
After signup, you should see:
```
✅ Brevo email service is ready
📧 Sender email: futurfit2@gmail.com
📧 Sending verification email to: user@example.com
✅ Verification email sent successfully
```

### Email Not Received?
1. Check spam/junk folder
2. Verify BREVO_SMTP_KEY is correct in Render
3. Check Brevo Dashboard → Statistics → Email Activity

---

## Done! 🎉
Your email system is now working perfectly!
