import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// POST /feedback
router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category)
      return res.status(400).json({ message: "All fields are required" });

    const feedback = await Feedback.create({ title, description, category });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /feedback
router.get("/", async (req, res) => {
  try {
    const { sort, category, q } = req.query;
    const query = {};
    if (category) query.category = category;
    if (q) query.title = { $regex: q, $options: "i" };

    let feedbacks = Feedback.find(query);
    feedbacks = sort === "oldest" ? feedbacks.sort({ createdAt: 1 }) : feedbacks.sort({ createdAt: -1 });

    const results = await feedbacks;
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /feedback/:id/upvote
router.patch("/:id/upvote", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });

    feedback.upvotes = (feedback.upvotes || 0) + 1;
    await feedback.save();

    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /feedback/:id
router.delete("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });

    res.json({ deletedId: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

