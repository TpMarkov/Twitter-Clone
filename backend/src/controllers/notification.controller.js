import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const deleteNotification = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const user = await User.findOne({ clerId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const notifications = await Notification.find({
    to: user._id,
  })
    .sort({ addedAt: -1 })
    .populate("from", "username firstName lastName profilePicture")
    .populate("post", "contnt image")
    .populate("comment", "content");

  res.status(200).json({ notifications });
});

export const getNotifications = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { notificationId } = req.params;

  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const notification = await Notification.findByIdAndDelete({
    if: notificationId,
    to: user._id,
  });

  if (!notification)
    return res.status(404).json({ error: "Notification not found" });

  res.status(201).json({ message: "Notification deleted successfully" });
});
