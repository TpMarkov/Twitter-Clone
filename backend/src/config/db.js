import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Successfully connected to the DB ✅");
  } catch (error) {
    console.error("Error connecting with MongoDB:", error.message, "❌");
    process.exit(1);
  }
};
