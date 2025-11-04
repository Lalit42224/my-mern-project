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
const allowedOrigins = [
  "http://localhost:5173",
  "https://verse-link.vercel.app", // ✅ your live frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
