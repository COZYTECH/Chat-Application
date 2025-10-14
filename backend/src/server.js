import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";
import path from "path";
import { connectDb } from "./lib/db.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use("/v1/api/auth", authRoutes);

//making it ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log("Server is running ");
  console.log(`http://localhost:${process.env.PORT}`);
  connectDb();
});
