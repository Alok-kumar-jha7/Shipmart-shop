import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "SHIPMART_AUTHENTICATION",
    });

    console.log("MongoDB Connected:");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    process.exit(1);
  }
};
