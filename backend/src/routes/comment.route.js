import express from "express";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

//  Public routes
router.get("/post/:postId", getComments);

//  Protected routes
router.post("/post/:postId", protectRoute, createComment);
router.delete("/post/:commentId", protectRoute, deleteComment);

export default router;
