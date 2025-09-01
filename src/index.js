// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import feedbackRoutes from "./routes/feedback.js";

dotenv.config();

const app = express();

// ✅ Allowed origins for CORS
const allowedOrigins = [
  "https://feedforward-frontend.onrender.com",
  "http://localhost:5173"
];

// ✅ Middleware
app.use(express.json());

// ✅ CORS setup
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ Prevent caching for API responses
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// ✅ Routes
app.use("/feedback", feedbackRoutes);

// ✅ Connect to database
connectDB();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


