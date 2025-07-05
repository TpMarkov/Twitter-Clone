import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

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
