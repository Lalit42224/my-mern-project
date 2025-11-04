import express from "express";
import {
  addLink,
  addMultipleLinks,
  getMyLinks,
  updateLink,
  deleteLink,
} from "../controllers/linkController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import Link from "../models/link.js";
import User from "../models/user.js";

const router = express.Router();

// --------------------
// 🔒 Protected Routes
// --------------------
router.post("/add", verifyToken, addLink);
router.post("/add-multiple", verifyToken, addMultipleLinks);
router.get("/my-links", verifyToken, getMyLinks);
router.put("/update/:id", verifyToken, updateLink);
router.delete("/delete/:id", verifyToken, deleteLink);

// --------------------
// 🌐 Public Route: Get Profile by Username
// --------------------
// routes/linkRoutes.js
router.get("/profile/:username", async (req, res) => {
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
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
