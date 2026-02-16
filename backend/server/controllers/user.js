import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";
import { sendOtpMail } from "../util/sendEmail.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();24

  const user = await User.create({
    name,
    email,
    password,
    phone,
    otp,
    otpExpires: Date.now() + 5 * 60 * 1000,
  });

  await sendOtpMail(email, otp);

  res.status(201).json({
    success: true,
    message: "OTP sent to email",
  });
});
