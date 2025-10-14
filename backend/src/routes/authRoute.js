import express from "express";
import { signIn } from "../controller/authController.js";

const router = express.Router();

router.get("/signup", signIn);

export default router;
