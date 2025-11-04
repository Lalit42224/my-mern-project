import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import multer from "multer";


const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const createToken = (user) =>
  jwt.sign({ id: user._id, username: user.userName }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
// ✅ Register
router.post("/register", upload.single("photo"), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    if (!username || !email || !password || !photo) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed, avatar: photo });

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: photo,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//login//
// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    // Optionally set cookie (if you want login persistence)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Respond with success
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar || null,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});


// ✅ Logout (clear cookie)
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
// ✅ Check Auth (verify JWT from cookie)
// ✅ FIXED /check ROUTE
router.get("/check", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ authenticated: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB to include avatar
    const user = await User.findById(decoded.id).select("username email avatar");

    if (!user) return res.json({ authenticated: false });

    res.json({
      authenticated: true,
      user,
    });
  } catch (err) {
    console.error("Check auth error:", err);
    res.json({ authenticated: false });
  }
});


export default router;
