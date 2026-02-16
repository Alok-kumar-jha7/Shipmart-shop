import express from "express";
import { registerUser } from "../controllers/user.js";
import { verifyOtp, resendOtp } from "../controllers/otp.js";

const router = express.Router();

router.post("/user-registration", registerUser);
router.post("/verify-user", verifyOtp);
router.post("/resend-otp", resendOtp);

export default router;
