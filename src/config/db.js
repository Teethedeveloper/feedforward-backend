// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI is not defined. Please set it in .env or Render Environment Variables");
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // 5s timeout
      socketTimeoutMS: 45000,         // 45s idle timeout
    });
    console.log("✅ MongoDB connected");

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Retrying in 5s...");
      setTimeout(connectDB, 5000);
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB error:", err.message);
    });

  } catch (err) {
    console.error("❌ MongoDB initial connection failed:", err.message);
    setTimeout(connectDB, 5000); // retry after 5s
  }
};

export default connectDB;
