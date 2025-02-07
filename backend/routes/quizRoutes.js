const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

// ✅ Create a new Quiz
router.post("/quiz", async (req, res) => {
  try {
    const { title, questions } = req.body;
    const newQuiz = new Quiz({ title, questions });
    await newQuiz.save();
    res.json({ success: true, message: "Quiz Created Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Fetch all Quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
