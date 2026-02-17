import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";
import { sendOtpMail } from "../util/sendEmail.js";
import { generateAccessToken, generateRefreshToken } from "../util/jwt.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";


export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  await User.create({
    name,
    email,
    password,
    phone,
    otp,
    otpExpires: Date.now() + 5 * 60 * 1000,
    isVerified: false,
  });

  await sendOtpMail(email, otp);


  res.status(201).json({
    success: true,
    message: "OTP sent to email",
  });
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  if (!user.isVerified) {
    return next(
      new ErrorHandler("Email not verified. Please verify OTP first", 401)
    );
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await User.findByIdAndUpdate(user._id, {
    refreshToken,
  });

  res.status(200).json({
    success: true,
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: null,
    },
  });
});


// export const refreshToken = catchAsyncError(async (req, res, next) => {
//   const { token } = req.body;

//   if (!token) return next(new ErrorHandler("No token provided", 401));

//   const user = await User.findOne({ refreshToken: token });
//   if (!user) return next(new ErrorHandler("Invalid refresh token", 403));

//   jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err) => {
//     if (err) return next(new ErrorHandler("Refresh token expired", 403));

//     const accessToken = generateAccessToken(user);
//     res.status(200).json({ success: true, accessToken });
//   });
// });


 
export const logoutUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.body;
  if (!token) return next(new ErrorHandler("No token provided", 400));

  const user = await User.findOne({ refreshToken: token });
  if (user) {

user.refreshToken = null;
 await user.save();
  }

  res.status(204).send();
});