import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello from server.");
});

connectDB();

app.listen(ENV.PORT, () =>
  console.log(`Server is running on PORT : ${ENV.PORT} `)
);
