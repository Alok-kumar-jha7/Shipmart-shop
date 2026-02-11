import express from "express";
import { registerUser } from "../controllers/user.js";

const router = express.Router();

router.post("/user-registration", registerUser);

export default  router;
