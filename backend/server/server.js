import express from "express";
import dotenv from "dotenv";
import { applyMiddleware } from "./middlewares/index.js";
import { connectToDatabase } from "./database/dbconnection.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();

const app = express();

applyMiddleware(app);

// ROUTES YAHAN AAYENGE
// app.use("/api/auth", authRoutes);

app.use(errorMiddleware);


const startServer = async () => {
  try {

    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("Server failed to start:", error.message);
  }
};

startServer();
