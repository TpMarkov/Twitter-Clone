import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import userRoutes from "../src/routes/user.route.js";
import postRoutes from "../src/routes/post.route.js";
import notificationRoutes from "../src/routes/notification.route.js";
import { arcjetMiddleware } from "./config/arcjet.js";

import commentRoutes from "../src/routes/comment.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());
app.use(arcjetMiddleware);
//  Users routes
app.use("/api/users", userRoutes);

//  Post routes
app.use("/api/posts", postRoutes);

//  Comments routes
app.use("/api/comments", commentRoutes);

//  Notifications routes
app.use("/api/notifications", notificationRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

//  Greeting message when server is runs with no issues ( can remove later on ...)
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
