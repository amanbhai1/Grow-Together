const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier"); // Add this line
const Assignment = require("../models/Assignment");

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use multer.memoryStorage() to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Upload Assignment
router.post("/assignments", upload.single("file"), async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    // Convert buffer to stream and upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Pipe the buffer to Cloudinary using streamifier
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // Save assignment to MongoDB
    const newAssignment = new Assignment({
      title: req.body.title, // Ensure title is sent from frontend
      fileUrl: result.secure_url,
    });
    await newAssignment.save();

    res.json({ success: true, message: "Assignment Uploaded Successfully" });
  } catch (error) {
    console.error("Error uploading assignment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});


// ✅ Fetch All Assignments
router.get("/assignments", async (req, res) => {
    try {
      const assignments = await Assignment.find();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // ✅ Delete Assignment
  router.delete("/assignments/:id", async (req, res) => {
    try {
      const assignment = await Assignment.findByIdAndDelete(req.params.id);
      if (!assignment) {
        return res.status(404).json({ success: false, message: "Assignment not found" });
      }
      res.json({ success: true, message: "Assignment deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });



module.exports = router;