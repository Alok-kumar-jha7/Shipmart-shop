import nodemailer from "nodemailer";

export const sendOtpMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL}>`,
    to: email,
    subject: "Verify Your Account",
    html: `
    <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px;">
      <div style="max-width:500px;margin:auto;background:white;padding:30px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1)">
        
        <h2 style="text-align:center;color:#333">Account Verification</h2>

        <p style="color:#555;font-size:15px">
          Hello,<br><br>
          Thank you for creating an account. Please use the OTP below to verify your email.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <span style="font-size:32px;letter-spacing:8px;font-weight:bold;color:#4CAF50">
            ${otp}
          </span>
        </div>

        <p style="text-align:center;color:#777">
          This OTP is valid for <b>5 minutes</b>.
        </p>

        <hr style="margin:25px 0">

        <p style="font-size:12px;color:#999;text-align:center">
          If you didn’t request this, please ignore this email.
        </p>

      </div>
    </div>
    `,
  });
};
