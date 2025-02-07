const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require("../models/User"); // Adjust the path if necessary

dotenv.config();

const router = express.Router();

// Add CORS middleware
router.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/ask-ai/:email", async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, error: "Missing Gemini AI API key" });
    }

    const { email } = req.params;

    // Fetch user details from MongoDB using email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Construct student data
    const studentData = {
      name: `${user.fname} ${user.lname || ""}`.trim(),
      email: user.email,
      roll: user.roll,
      
      language: user.language || "Not specified",
      enrolledCourses: user.enrolledCourses.length > 0 ? user.enrolledCourses : ["No courses enrolled"],
      teachingCourses: user.teachingCourses.length > 0 ? user.teachingCourses : ["Not a mentor"],
      learningPace: "Moderate", // Consider improving with real metrics later
    };

    const prompt = `Analyze the following student record and provide personalized feedback with a roadmap for improvement:\n\n${JSON.stringify(studentData)} and when finishing by best reagards always use The Code Sneaker's`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Ensure the response exists
    const feedback = response.response?.candidates?.[0]?.content?.parts?.[0]?.text || "AI did not generate a response.";

    res.json({ 
      success: true,
      userDetails: studentData, 
      feedback 
    });

  } catch (error) {
    console.error("Error fetching AI response:", error);
    res.status(500).json({ 
      success: false,
      error: error.message || "AI analysis failed"
    });
  }
});

module.exports = router;