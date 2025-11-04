import express from "express";
import User from "../models/user.js";

const router = express.Router();

// ➕ Add or update user
router.post("/save", async (req, res) => {
  try {
    const { username, bio, avatar, links } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { username, bio, avatar, links },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔍 Get user by username
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
