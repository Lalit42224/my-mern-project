import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token; // 👈 from cookie
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token found." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
