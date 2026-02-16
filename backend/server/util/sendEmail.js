import nodemailer from "nodemailer";

export const sendOtpMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const logoUrl = "https://socialapps.tech/sites/default/files/nodeicon/plugins_email-verification-plugin.png";

  await transporter.sendMail({
    from: `"Shipmart" <${process.env.EMAIL}>`,
    to: email,
    subject: "Verify Your Shipmart Account",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px;">
        <div style="max-width:500px;margin:auto;background:white;padding:30px;border-radius:10px;box-shadow:0 0 15px rgba(0,0,0,0.1)">
          
          <!-- Logo -->
          <div style="text-align:center;margin-bottom:20px;">
            <img src="${logoUrl}" alt="Shipmart" style="width:120px; height:auto;" />
          </div>

          <h2 style="text-align:center;color:#333; margin-bottom:10px;">Verify Your Account</h2>

          <p style="color:#555;font-size:15px; line-height:1.6;">
            Hello,<br><br>
            Thank you for creating an account at <b>Shipmart</b>. Use the OTP below to verify your email address.
          </p>

          <!-- OTP Box -->
          <div style="text-align:center;margin:30px 0;">
            <span style="font-size:32px;letter-spacing:8px;font-weight:bold;color:#4CAF50;background:#eafaf1;padding:10px 20px;border-radius:8px;display:inline-block;">
              ${otp}
            </span>
          </div>

          <p style="text-align:center;color:#777; font-size:14px;">
            This OTP is valid for <b>5 minutes</b>.
          </p>

          <hr style="margin:25px 0; border:none; border-top:1px solid #eee;">

          <p style="font-size:12px;color:#999;text-align:center;line-height:1.4;">
            If you didn’t request this, please ignore this email. <br/>
            © ${new Date().getFullYear()} Shipmart
          </p>
        </div>
      </div>
    `,
  });
};
