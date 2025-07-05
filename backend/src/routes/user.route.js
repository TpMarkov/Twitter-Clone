import express from "express";
import {
  getUserProfile,
  updateProfile,
  syncUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post("/sync", protectRoute, syncUser);

//  Update profile
router.put("/profile", protectRoute, updateProfile);

export default router;
