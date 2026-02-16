import express from "express";
import { loginUser, registerUser } from "../controllers/user.js";
import { verifyOtp, resendOtp } from "../controllers/otp.js";

const router = express.Router();

router.post("/user-registration", registerUser);
router.post("/login-user",loginUser)
router.post("/verify-user", verifyOtp);
router.post("/resend-otp", resendOtp);

export default router;
