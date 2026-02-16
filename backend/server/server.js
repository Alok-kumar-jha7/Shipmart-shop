import express from "express";
import dotenv from "dotenv";
import { applyMiddleware } from "./middlewares/index.js";
import { connectToDatabase } from "./database/dbconnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import router from "./routes/authRoutes.js";

dotenv.config();

const app = express();

applyMiddleware(app);
app.use(express.json({ limit: "10mb" }));
app.use("/auth/api", router);
app.use(errorMiddleware);

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
