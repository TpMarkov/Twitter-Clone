import asyncHandler from "express-async-handler";

import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";

import { getAuth } from "@clerk/express";

export const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture");

  res.status(200).json({ comments });
});

export const createComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Comment content is required" });
  }

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findById(postId);

  if (!post || !user)
    return res.status(400).json({ error: "Post or user not found" });

  // Create the comment
  // Create the comment
  const comment = await Comment.create({
    user: user._id,
    post: postId,
    content,
  });
  // Link the comment with the current post
  await Post.findByIdAndUpdate(postId, {
    $push: { comments: comment._id },
  });
  //    Crete notification if not commenting on your own post
  if (userId.toString() !== post.user.toString()) {
    const notification = await Notification({
      from: user._id,
      to: post.user,
      type: "comment",
      post: postId,
      comment: comment._id,
    });
  }

  res.status(201).json({ comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { commentId } = req.params;

  const user = await User.findOne({ clerkId: userId });
  const comment = await Comment.findById(commentId);

  if (!comment || !user)
    return res.status(400).json({ error: "User or comment not found" });
  //    Check comment is user's own one
  if (comment.user.toString() !== user._id.toString()) {
    return res
      .status(403)
      .json({ error: "You can only delete your own comments" });
  }

  //    Delete comment and update post comments
  await Post.findOneAndUpdate(comment.post, {
    $pull: { commnets: commentId },
  });

  //    Delete the comment
  await Comment.findOneAndDelete(commentId);

  return res.status(200).jsonp({ message: "Comment successfully deleted" });
});
