// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";   // <-- Add helmet
import connectDB from "./config/db.js";
import feedbackRoutes from "./routes/feedback.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS setup
const allowedOrigins = [
  "https://feedforward-frontend.onrender.com",
  "http://localhost:5173"
];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
}));

// ✅ Security headers (helmet covers most)
app.use(helmet({
  contentSecurityPolicy: false, // disable if CSP breaks frontend for now
}));

// ✅ Explicit no-cache headers (extra safety)
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("X-Content-Type-Options", "nosniff"); // <-- Important fix
  next();
});

// ✅ Routes
app.use("/feedback", feedbackRoutes);

app.get("/test-mongo", (req, res) => {
  const state = mongoose.connection.readyState;
  if (state === 1) {
    res.status(200).send("✅ MongoDB is connected");
  } else if (state === 2) {
    res.status(200).send("⏳ MongoDB is connecting...");
  } else {
    res.status(500).send("❌ MongoDB is NOT connected");
  }
});

// ✅ Connect to MongoDB
connectDB();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


