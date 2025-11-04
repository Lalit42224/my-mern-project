import express from "express";
import User from "../models/user.js";
import Link from "../models/link.js";

const router = express.Router();

// ✅ Public profile route
router.get("/u/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const links = await Link.find({ user: user._id });

    res.json({
      username: user.username,
      avatar: user.avatar,
      links,
    });
  } catch (error) {
    console.error("Error loading profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
