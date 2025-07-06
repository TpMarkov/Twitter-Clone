import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import userRoutes from "../src/routes/user.route.js";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import postRoutes from "../src/routes/post.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});
app.get("/", (req, res) => {
  res.send("Hello from server.");
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () =>
      console.log(`Server is running on PORT : ${ENV.PORT} `)
    );
  } catch (error) {
    console.error("Error connecting the server:", error.message);
  }
};
startServer();
