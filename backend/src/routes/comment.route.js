import express from "express";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controller.js";
const router = express.Router();

//  Public routes
router.get("/post/:postId", getComments);

//  Protected routes
router.post("/post/:postId", createComment);
router.delete("/post/:commentId", deleteComment);

export default router;
