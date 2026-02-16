import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";
import { sendOtpMail } from "../util/sendEmail.js";

// VERIFY OTP

export const verifyOtp = catchAsyncError(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new ErrorHandler("Email and OTP required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.verificationExpire < Date.now()) {
    return next(new ErrorHandler("OTP expired", 400));
  }

  if (user.verificationCode !== otp) {
    return next(new ErrorHandler("Invalid OTP", 400));
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Account verified successfully",
  });
});

//  RESEND OTP
export const resendOtp = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Email required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.isVerified) {
    return next(new ErrorHandler("Account already verified", 400));
  }

  const newOtp = Math.floor(1000 + Math.random() * 9000).toString();

  user.otp = newOtp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;

  await user.save();

  await sendOtpMail(email, newOtp);

  res.status(200).json({
    success: true,
    message: "New OTP sent to email",
  });
});
