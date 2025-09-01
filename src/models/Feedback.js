import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Bug", "Feature", "Improvement"],
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
