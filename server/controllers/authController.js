import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// ---------------------- REGISTER ----------------------
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import fetch from "node-fetch"; // use this to call DiceBear API

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Generate custom avatar using DiceBear API
    const avatarApiUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
      username || email
    )}`;

    const avatarResponse = await fetch(avatarApiUrl);
    const avatarSvg = await avatarResponse.text();

    // ✅ Convert SVG to Base64 (optional) or just save the API URL
    const avatarData = Buffer.from(avatarSvg).toString("base64");
    const avatarUrl = `data:image/svg+xml;base64,${avatarData}`;

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar: avatarUrl, // Store base64 avatar
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "✅ User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------------- LOGIN ----------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Send token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "✅ Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------- LOGOUT ----------------------
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "✅ Logged out successfully" });
};
