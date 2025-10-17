import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import path from "path";
import { connectDb } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/messages", messageRoutes);

//making it ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log("Server is running ");
  console.log(`http://localhost:${ENV.PORT}`);
  connectDb();
});
