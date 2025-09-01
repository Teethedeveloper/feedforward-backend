import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import feedbackRoutes from "./routes/feedback.js";

dotenv.config();

const app = express();

// Allowed origins
const allowedOrigins = [
  "https://feedforward-frontend.onrender.com",
  "http://localhost:5173"
];

// Middleware
app.use(express.json());

// Single dynamic CORS setup for all requests, including preflight
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like Postman or curl
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));

// Routes
app.use("/feedback", feedbackRoutes);

// DB connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

