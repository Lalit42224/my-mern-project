import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();
const app = express();

// ✅ Allowed origins for frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://verse-link.vercel.app", // your live frontend
];

// ✅ CORS setup (must come before routes)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ important for cookies
  })
);

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ✅ Base route (for quick check)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
app.use("/api", profileRoutes);

// ✅ MongoDB connection + Server start
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("❌ DB Error:", err));
