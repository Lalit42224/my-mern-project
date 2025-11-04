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

// ✅ Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Allow both frontend dev ports
    credentials: true, // allow cookies if needed
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ✅ Base Route (for quick check)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
app.use("/api", profileRoutes);

// ✅ MongoDB + Server
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.log("❌ DB Error:", err));
