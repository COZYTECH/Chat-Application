import express from "express";
import {
  signUp,
  signIn,
  logout,
  updateProfile,
} from "../controller/authController.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcject.middleware.js";

const router = express.Router();
router.use(arcjetProtection);

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user)
);

export default router;
