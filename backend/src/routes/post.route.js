import express from "express";
import {
  getPosts,
  getUserPosts,
  getPost,
  createPost,
  likePost,
  deletePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Public requestes
router.get("/", getPosts);
router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);

//  ProtecteddRoutes routes
router.post("/", protectRoute, upload.single("image"), createPost);
router.post("/:postId/like", protectRoute, likePost);
router.delete("/:postId", protectRoute, deletePost);

export default router;
