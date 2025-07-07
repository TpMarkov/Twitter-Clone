import asyncHandler from "express-async-handler";
import { getAuth, clerkClient } from "@clerk/express";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json({ user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const allowedUpdates = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    // Add other allowed fields
  };

  const user = await User.findOneAndUpdate(
    { clerkId: userId },
    allowedUpdates,
    {
      new: true,
    }
  );

  if (!user) return res.status(400).json({ error: "User not found" });

  res.status(200).json({ user });
});

export const syncUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const existingUser = await User.findOne({ clerkId: userId });
  if (existingUser)
    return res
      .status(200)
      .json({ user: existingUser, message: "User already exists" });

  const clerkUser = await clerkClient.users.getUser(userId);

  if (!clerkUser.emailAddresses || clerkUser.emailAddresses.length === 0) {
    return res.status(400).json({ error: "No email address found for user" });
  }

  const userData = {
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
    profilePicture: clerkUser.imageUrl || "",
  };

  const user = await User.create(userData);

  res.status(201).json({ user, message: "User created successfully" });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOne({ clerkId: userId });

  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json({ user });
});

export const followUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { targetUserId } = req.params;

  if (userId === targetUserId)
    return res.status(400).json({ error: "Cannot follow yourself" });

  const currentUser = await User.findOne({ clerkId: userId });
  const targetUser = await User.findOne({ clerkId: targetUserId });

  if (!currentUser || !targetUser)
    return res.status(404).json({ error: "User not found" });

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    await User.findOneAndUpdate(
      { _id: currentUser._id },
      { $pull: { following: targetUser._id } }
    );
    await User.findOneAndUpdate(
      { _id: targetUser._id },
      { $pull: { followers: currentUser._id } }
    );
  } else {
    await User.findOneAndUpdate(
      { _id: currentUser._id },
      { $push: { following: targetUser._id } }
    );
    await User.findOneAndUpdate(
      { _id: targetUser._id },
      { $push: { followers: currentUser._id } }
    );
  }

  // Create notification only when following (not unfollowing)
  if (!isFollowing) {
    await Notification.create({
      from: currentUser._id,
      to: targetUserId,
      type: "follow",
    });
  }

  res.status(200).json({
    message: isFollowing
      ? "User successfully unfollowed"
      : "User successfully followed",
  });
});
