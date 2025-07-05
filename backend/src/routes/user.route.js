import express from "express";
import {
  getUserProfile,
  updateProfile,
  syncUser,
  getCurrentUser,
  followUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
// Public routes
router.get("/profile/:username", getUserProfile);

//  Protected routes
router.get("/me", protectRoute, getCurrentUser);
router.post("/sync", protectRoute, syncUser);
router.post("/follow/:targetUser", protectRoute, followUser);
router.put("/profile", protectRoute, updateProfile);

export default router;
