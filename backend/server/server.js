import express from "express";
import dotenv from "dotenv";
import { applyMiddleware } from "./middlewares/index.js";
import { connectToDatabase } from "./database/dbconnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import router from "./routes/authRoutes.js";
import {User} from "./models/userModel.js"

dotenv.config();

const app = express();

applyMiddleware(app);
app.use(express.json({ limit: "10mb" }));
app.use("/auth/api", router);
app.use(errorMiddleware);


setInterval(async () => {
  const now = Date.now();
  await User.updateMany(
    { otpExpires: { $lte: now }, otp: { $exists: true } },
    { $set: { otp: null, otpExpires: null } }
  );
}, 60 * 1000);


const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Server failed to start:", error.message);
  }
};

startServer();
