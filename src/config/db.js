// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Stop trying after 5s
      socketTimeoutMS: 45000,         // Close sockets after 45s idle
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
    // Retry after 5s
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
